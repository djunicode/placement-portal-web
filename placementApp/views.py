from .models import Student, Position, Company, Application
from .serializers import (
    StudentSerializer,
    PositionReadSerializer,
    PositionWriteSerializer,
    CompanySerializer,
)
from .serializers import *
from .utils import generate_xls, get_curent_year
from .permissions import IsTPOOrOwner, IsTPOOrReadOnly, IsStaff, ApplicationPermissions
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, permissions, status, mixins, generics
from rest_framework.response import Response


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


class StudentViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,
):
    permission_classes = (IsTPOOrOwner,)
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


class ApplicationViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = (ApplicationPermissions,)
    serializer_class = ApplicationSerializer

    def perform_create(self, serializer):
        serializer.save(student=Student.objects.get(pk=self.request.user.pk))

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == "PUT" or self.request.method == "PATCH":
            # Position will also be read-only for Update operations,
            # Hence a different serializer is required for Update operations
            serializer_class = ApplicationSerializerPositionReadOnly

        return serializer_class

    def get_queryset(self):
        if self.request.user.is_student():
            return Application.objects.filter(student=self.request.user)
        return Application.objects.all()


class PositionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsTPOOrReadOnly,)
    queryset = Position.objects.all()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return PositionReadSerializer
        return PositionWriteSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = (IsTPOOrReadOnly,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


@api_view(
    ["GET",]
)
@permission_classes((IsStaff,))
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
