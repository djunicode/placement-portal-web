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
            "password": "hi",
            "password2": "hi",
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
            "password": "hi",
            "password2": "hi",
        }
        response = self.client.post("/coordinator_signup/", data)
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
