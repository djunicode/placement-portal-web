from .models import Student, Position, Company, Application, Coordinator
import datetime
from .serializers import *
from .utils import generate_xls, get_valid_workbook_name, get_curent_year
from .permissions import (
    IsStaffOrOwner,
    IsTPOOrReadOnly,
    IsStaff,
    ApplicationPermissions,
    IsStudentOrReadOnly,
)
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, permissions, status, mixins, generics
from rest_framework.response import Response
from django.contrib.auth import authenticate


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
    permission_classes = (IsStaffOrOwner,)
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class UpdateStudentViewSet(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    permission_classes = (IsStudentOrReadOnly,)
    queryset = Student.objects.filter()
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
        # Create an application using currently authenticated user

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == "PUT" or self.request.method == "PATCH":
            # Position will also be read-only for Update operations,
            # Hence a different serializer is required for Update operations
            serializer_class = ApplicationSerializerPositionReadOnly

        return serializer_class

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Application.objects.none()
        if self.request.user.is_student():
            return Application.objects.filter(student=self.request.user)
            # Students should only be able to query their applications
        return Application.objects.all()
        # TPO / Co-ordinator can query any Application


class PositionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsTPOOrReadOnly,)

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return PositionReadSerializer
        return PositionWriteSerializer

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Position.objects.none()
        if self.request.user.is_student():
            return Position.objects.filter(deadline__gt=datetime.datetime.now())
        return Position.objects.all()


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = (IsTPOOrReadOnly,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CoordinatorViewSet(viewsets.ModelViewSet):
    permission_classes = (IsTPOOrReadOnly,)
    queryset = Coordinator.objects.all()
    serializer_class = CoordinatorSerializer


@api_view(
    ["GET",]
)
@permission_classes((IsStaff,))
def get_xls(request, company_id):
    company = Company.objects.get(id=company_id)

    name_of_workbook = get_valid_workbook_name(company.name) + "-" + str(get_curent_year()) + ".xls"
    response = HttpResponse(content_type="application/ms-excel")
    response["Content-Disposition"] = (
        "attachment; filename=" + '"' + name_of_workbook + '"'
    )

    wb = generate_xls(company)
    wb.save(response)
    return response


class ObtainAuthTokenView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        context = {}
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        account = authenticate(email=email, password=password)
        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            context['role'] = account.role
            context['token'] = token.key
        else:
            context['response'] = 'Error'
            context['error_message'] = 'Invalid credentials'

        return Response(context)
