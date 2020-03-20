from djoser.serializers import UserCreateSerializer,UserSerializer
from rest_framework import serializers
from .models import *


class StudentSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
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
            "password2"
        )


class CoordinatorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = Coordinator
        fields = (
            "id",
            "f_name",
            "l_name",
            "email",
            "department",
            "password",
        )



class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "sap_ID",
            "department",
            "year",
        )



class PositionSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta:
        model = Position
        fields = "__all__"
