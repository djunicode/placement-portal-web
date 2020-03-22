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


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class PositionSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())
    class Meta:
        model = Position
        fields = "__all__"
    