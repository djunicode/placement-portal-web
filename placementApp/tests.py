import json
from .models import User, Student, Coordinator, Company, Application, Position
from .serializers import *

from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class SignUpTestCase(APITestCase):

    # Testing student signup endpoint
    def student_signup(self):
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
    def coordinator_signup(self):
        data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "email": "sakshiuppoor@gmail.com",
            "department": "COMPS",
            "password": "pass@123",
            "password2": "pass@123",
        }
        response = self.client.post("/coordinator_signup/", data)
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


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
        self.list_url = reverse("Students-list")
        self.retrieve_url = reverse("Students-detail", kwargs={"pk": self.student.id})

    # Authenticating the user
    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    # Testing students list view for unauthorized users
    def test_student_list_unauthorized(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Testing students list view for students
    def test_student_list_student(self):
        self.api_authentication(self.student_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # Testing students list view for co-ordinators
    def test_student_list_co(self):
        self.api_authentication(self.co_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing students list view for tpo
    def test_student_list_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing students detail view for unauthorized users
    def test_student_retreive_unauthorized(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Testing students detail view for student who owns the profile
    def test_student_retreive_studentowner(self):
        self.api_authentication(self.student_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing students detail view for students other than the owner
    def test_student_retreive_student(self):
        self.api_authentication(self.student2_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # Testing students detail view for co-ordinator
    def test_student_retreive_co(self):
        self.api_authentication(self.co_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing students detail view for tpo
    def test_student_retreive_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
