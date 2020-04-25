import json
from .models import User, Student, Coordinator, Company, Application, Position
from .serializers import *

from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# Signup Test Cases
class SignUpTestCase(APITestCase):

    # Testing student signup endpoint
    def test_student_signup(self):
        data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "email": "sakshiuppoor@gmail.com",
            "sap_ID": "60004180090",
            "pointer": "9.30",
            "department": "COMPS",
            "year": "BE",
            "password": "pass@123",
            "password2": "pass@123",
        }
        response = self.client.post("/student_signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Testing coordinator signup endpoint
    def test_coordinator_signup(self):
        data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "email": "sakshiuppoor@gmail.com",
            "department": "COMPS",
            "password": "pass@123",
            "password2": "pass@123",
        }
        response = self.client.post("/coordinator_signup/", data)
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# Student Endpoints
class StudentProfileViewSetTestCase(APITestCase):
    def setUp(self):
        self.data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        # Creating students
        self.student = Student.objects.create_user(
            **self.data,
            email="s@s.com",
            role="STUDENT",
            sap_ID="60004180090",
            pointer="9.30",
            department="COMPS",
            year="BE"
        )
        self.student2 = Student.objects.create_user(
            **self.data,
            email="s2@s2.com",
            role="STUDENT",
            sap_ID="60004180091",
            pointer="9.30",
            department="COMPS",
            year="BE"
        )

        # Creating co-ordinator
        self.co = Coordinator.objects.create_user(
            **self.data, email="c@c.com", role="CO", department="COMPS"
        )

        # Creating TPO
        self.tpo = User.objects.create_user(**self.data, email="t@t.com", role="TPO")

        # Creating Tokens
        self.student_token = Token.objects.create(user=self.student)
        self.student2_token = Token.objects.create(user=self.student2)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        # Defining endpoints
        self.list_url = reverse("Student-list")
        self.retrieve_url = reverse("Student-detail", kwargs={"pk": self.student.id})

    # Authenticating the user
    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    # Testing students list view for co and tpo
    def test_student_list_co_tpo(self):
        self.api_authentication(self.co_token)
        #self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing students detail view for student who owns the profile, co-ordinator and tpo
    def test_student_retreive_studentowner_co_tpo(self):
        self.api_authentication(self.student_token)
        #self.api_authentication(self.co_token)
        #self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["email"], self.student.email)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Company Endpoints
class CompanyViewSetTestCase(APITestCase):
    def setUp(self):
        self.student_data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        self.data = {
            "name":"ABC",
            "category":"S",
            "link":"http://www.abc.com",
        }

        # Creating students
        self.student = Student.objects.create_user(
            **self.student_data,
            email="s@s.com",
            role="STUDENT",
            sap_ID="60004180090",
            pointer="9.30",
            department="COMPS",
            year="BE"
        ) 

        # Creating co-ordinator
        self.co = Coordinator.objects.create_user(
            **self.student_data, email="c@c.com", role="CO", department="COMPS"
        )

        # Creating TPO
        self.tpo = User.objects.create_user(**self.student_data, email="t@t.com", role="TPO")

        # Creating Tokens
        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        # Creating company
        self.company = Company.objects.create(**self.data)

        # Defining endpoints
        #self.create_url = reverse("Company-create")
        self.list_url = reverse("Company-list")
        self.retrieve_url = reverse("Company-detail", kwargs={"pk": self.company.id})
        
    # Authenticating the user
    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    # Testing company create view for tpo
    def test_company_create_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    # Testing company list view for student, co and tpo
    def test_company_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        #self.api_authentication(self.co_token)
        #self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # Testing company detail view for student, co-ordinator and tpo
    def test_company_retreive_tpo(self):
        self.api_authentication(self.student_token)
        #self.api_authentication(self.co_token)
        #self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["name"], self.company.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # Testing company update view for tpo
    def test_company_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"name":"XYZ"})
        self.assertEqual(response.data["name"], "XYZ")
        self.assertEqual(response.status_code, status.HTTP_200_OK)