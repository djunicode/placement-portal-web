from djoser.serializers import UserCreateSerializer,UserSerializer
from rest_framework import serializers
from .models import User,Student,Coordinator


class StudentSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )
    class Meta:
        model = Student
        fields = (
            "first_name",
            "last_name",
            "email",
            "division",
            "department",
            "year",
            "sap_ID",
            "pointer"
            "password",
        )
        read_only_fields = ("is_student", "is_teacher", "is_banned")



class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta:
        model=User
        fields=('email','f_name','l_name','role','password')
