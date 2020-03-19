<<<<<<< HEAD
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
=======
from rest_framework import serializers
from .models import Student, Position, Company


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            "id",
            "username",
            # "first_name",
            # "last_name",
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
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3
