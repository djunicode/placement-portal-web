import json
from .models import User, Student, Coordinator, Company, Application, Position
from .serializers import *

from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class SignUpTestCase(APITestCase):
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
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

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
        self.student = User.objects.create_user(
            **self.data, email="s1@s1.com", role="STUDENT"
        )
        self.student2 = User.objects.create_user(
            **self.data, email="s2@s2.com", role="STUDENT"
        )
        self.co = User.objects.create_user(**self.data, email="c@c.com", role="CO")
        self.tpo = User.objects.create_user(**self.data, email="t@t.com", role="TPO")
        self.student_token = Token.objects.create(user=self.student)
        self.student2_token = Token.objects.create(user=self.student2)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        self.list_url = reverse("Students-list")
        self.retrieve_url = reverse("Students-detail", kwargs={"pk":self.student.id})

    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    def test_student_list_unauthorized(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_student_list_student(self):
        self.api_authentication(self.student_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_list_co(self):
        self.api_authentication(self.co_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_list_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
