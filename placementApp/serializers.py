<<<<<<< HEAD
<<<<<<< HEAD
from rest_framework import serializers
from .models import Student, Position, Company
=======
=======

from rest_framework import serializers
from .models import Student, Position, Company
>>>>>>> 5c806daf244428047ffa3c99a99bf115c6e3014b
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
            "department",
            "password",
            "password2",
        )
<<<<<<< HEAD
>>>>>>> upstream/master


=======
        
>>>>>>> 5c806daf244428047ffa3c99a99bf115c6e3014b
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            "id",
            "username",
<<<<<<< HEAD
<<<<<<< HEAD
            # "first_name",
            # "last_name",
=======
            "f_name",
            "l_name",
>>>>>>> upstream/master
=======
            "f_name",
            "l_name",
>>>>>>> 5c806daf244428047ffa3c99a99bf115c6e3014b
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
