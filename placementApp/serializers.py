from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *


class StudentSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"},
    )

    class Meta:
        model = Student
        fields = (
            "id",
            "f_name",
            "l_name",
            "email",
            "sap_ID",
            "department",
            "year",
            "pointer",
            "password",
            "password2",
        )


class CompanySerializer:
    class Meta:
        model = Company
        fields = "__all__"


class CoordinatorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"},
    )
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Coordinator
        fields = (
            "id",
            "f_name",
            "l_name",
            "email",
            "poniter",
            "department",
            "password",
            "password2",
        )


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            "id",
            "username",
            "f_name",
            "l_name",
            "email",
            "sap_ID",
            "department",
            "year",
        )


class PositionSerializer(serializers.ModelSerializer):
    #    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())
    company = CompanySerializer()

    class Meta:
        model = Position
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    position = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all())
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"
