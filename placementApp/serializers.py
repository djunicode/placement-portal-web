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
            "pointer",
            "profile_image",
            "department",
            "year",
        )


class CoordinatorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"},
    )
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    
    def validate(self, data):
        if data['email'].endswith("@djsce.ac.in") == False:    
            raise serializers.ValidationError(
                {"email": "Coordinator emails must end with @djsce.ac.in"}
            )
        return data
    
    class Meta:
        model = Coordinator
        fields = (
            "id",
            "f_name",
            "l_name",
            "email",
            "department",
            "password",
            "password2",
        )


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

class CoordinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinator
        fields = (
            'profile_image',
            'f_name',
            'email',
            'l_name',
            'role',
            'department',
            'username',
        )



class PositionReadSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = Position
        fields = "__all__"


class PositionWriteSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta:
        model = Position
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    position = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all())
    student = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"


class ApplicationSerializerPositionReadOnly(serializers.ModelSerializer):
    position = serializers.PrimaryKeyRelatedField(read_only=True)
    student = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=True, style={"input_type": "password"},)
