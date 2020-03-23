from django.shortcuts import HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import viewsets, permissions, status, mixins, generics
from rest_framework.response import Response

from .models import Student, Position, Company
from .serializers import *
from .utils import generate_xls, get_curent_year


class StudentSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Student.objects.all()
    serializer_class = StudentSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["role"] = "STUDENT"
        if (
            serializer.validated_data["password2"]
            == serializer.validated_data["password"]
        ):
            serializer.validated_data.pop("password2")
            hashed_password = make_password(serializer.validated_data["password"])
            serializer.validated_data["password"] = hashed_password
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "Could not create Student"}, status=status.HTTP_400_BAD_REQUEST
        )


class CoordinatorSignUpView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Coordinator.objects.all()
    serializer_class = CoordinatorSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["role"] = "CO"
        if (
            serializer.validated_data["password2"]
            == serializer.validated_data["password"]
        ):
            serializer.validated_data.pop("password2")
            hashed_password = make_password(serializer.validated_data["password"])
            serializer.validated_data["password"] = hashed_password
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "Could not create Coordinator"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class StudentViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,
):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class UpdateStudentViewSet(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )  # Temporarily till auth is done
    queryset = (
        Student.objects.filter()
    )  # Requires current user instance for further progress
    serializer_class = StudentSerializer


class PositionViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,
):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


def get_xls(request, company_id):
    company = Company.objects.get(id=company_id)

    name_of_workbook = company.name + "-" + str(get_curent_year()) + ".xls"
    response = HttpResponse(content_type="application/ms-excel")
    response["Content-Disposition"] = (
        "attachment; filename=" + '"' + name_of_workbook + '"'
    )

    wb = generate_xls(company)
    wb.save(response)

    return response
