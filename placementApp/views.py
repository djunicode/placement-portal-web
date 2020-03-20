import xlwt
import datetime
from django.shortcuts import HttpResponse
from .models import Student, Position, Company
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, status,mixins,generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response


class StudentSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Student.objects.all()
    serializer_class = StudentSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["role"] = "STUDENT"
        serializer.validated_data.pop("password2")
        hashed_password = make_password(serializer.validated_data["password"])
        serializer.validated_data["password"] = hashed_password
        print(self.perform_create(serializer))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CoordinatorSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Coordinator.objects.all()
    serializer_class = CoordinatorSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["role"] = "CO"
        serializer.validated_data.pop("password2")
        hashed_password = make_password(serializer.validated_data["password"])
        serializer.validated_data["password"] = hashed_password
        print(self.perform_create(serializer))
        return Response(serializer.data, status=status.HTTP_201_CREATED)




class StudentViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,
):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class PositionViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,
):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


#############################
#   EXCEL SHEET GENERATION  #
#############################


def get_xls(request, company_id):
    company = Company.objects.get(id=company_id)

    name_of_workbook = company.name + "-" + str(get_curent_year()) + ".xls"
    response = HttpResponse(content_type="application/ms-excel")
    response["Content-Disposition"] = "attachment; filename=" + name_of_workbook

    wb = generate_xls(company)
    wb.save(response)

    return response


def generate_xls(company):
    wb = xlwt.Workbook(encoding="utf-8")  # Creating Workbook

    positions = company.positions.all()
    for position in positions:
        wb = generate_sheet(wb, position)  # Creating separate sheets for each position

    return wb


def generate_sheet(wb, position):
    ws = wb.add_sheet(position.title)  # Creating sheet

    # Writing title of the sheet
    sheet_title = (
        "Applications for "
        + position.title
        + ", "
        + position.company.name
        + " "
        + str(get_curent_year())
    ).upper()
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    font_style.font.height = 300
    font_style.alignment.horz = 2
    ws.write_merge(0, 0, 0, 5, sheet_title, font_style)

    # Writing the column names
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    font_style.alignment.horz = 2
    columns = [
        "SAP ID",
        "Name of canditate",
        "Email address",
        "CGPA",
        "Status",
        "Submitted at",
    ]
    col_width = [
        13 * 260,
        26 * 260,
        30 * 260,
        7 * 260,
        23 * 260,
        18 * 260,
    ]

    row_num = 2
    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num].upper(), font_style)

    # Writing data into the columns
    font_style = xlwt.XFStyle()
    rows = []
    applications = position.applications.filter(submitted_at__year=get_curent_year())
    for application in applications:
        date_time = application.submitted_at.strftime("%m/%d/%Y, %H:%M:%S")
        rows.append(
            [
                application.student.sap_ID,
                "First_name Last_name",  # application.student.first_name + " " + application.student.last_name,
                application.student.email,
                "9.00",  # application.student.pointer,
                application.get_status_display(),
                date_time,
            ]
        )
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)
            ws.col(col_num).width = col_width[col_num]

    return wb


def get_curent_year():
    return datetime.date.today().year
