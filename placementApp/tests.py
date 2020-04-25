import json
from .models import User, Student, Coordinator, Company, Application, Position
from .serializers import *

from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from django.utils import timezone
import pytz

# Signup Test Cases
class SignUpTestCase(APITestCase):

    #############################
    #           Tests           #
    #############################

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
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# Student Endpoints
class StudentProfileViewSetTestCase(APITestCase):
    def setUp(self):

        #########################
        #   Data Dictionaries   #
        #########################

        self.data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        #########################
        #   Creating objects    #
        #########################

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

        # Creating co-ordinator
        self.co = Coordinator.objects.create_user(
            **self.data, email="c@c.com", role="CO", department="COMPS"
        )

        # Creating TPO
        self.tpo = User.objects.create_user(**self.data, email="t@t.com", role="TPO")

        # Creating Tokens
        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        #########################
        #   Defining endpoints  #
        #########################

        self.list_url = reverse("Student-list")
        self.retrieve_url = reverse("Student-detail", kwargs={"pk": self.student.id})

    ###############################
    #   Authenticating the user   #
    ###############################

    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    #############################
    #           Tests           #
    #############################

    # Testing students list view for co and tpo
    def test_student_list_co_tpo(self):
        self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing students detail view for student who owns the profile, co-ordinator and tpo
    def test_student_retreive_studentowner_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["email"], self.student.email)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Company Endpoints
class CompanyViewSetTestCase(APITestCase):
    def setUp(self):

        #########################
        #   Data Dictionaries   #
        #########################

        self.student_data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        self.data = {
            "name": "ABC",
            "category": "S",
            "link": "http://www.abc.com",
        }

        #########################
        #   Creating objects    #
        #########################

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
        self.tpo = User.objects.create_user(
            **self.student_data, email="t@t.com", role="TPO"
        )

        # Creating Tokens
        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        # Creating position
        self.company = Company.objects.create(**self.data)

        #########################
        #   Defining endpoints  #
        #########################

        self.list_url = reverse("Company-list")
        self.retrieve_url = reverse("Company-detail", kwargs={"pk": self.company.id})

    ###############################
    #   Authenticating the user   #
    ###############################

    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    #############################
    #           Tests           #
    #############################

    # Testing company create view for tpo
    def test_company_create_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Testing company list view for student, co and tpo
    def test_company_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing company detail view for student, co-ordinator and tpo
    def test_company_retreive_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["name"], self.company.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing company update view for tpo
    def test_company_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"name": "XYZ"})
        self.assertEqual(response.data["name"], "XYZ")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Position Endpoints
class PositionViewSetTestCase(APITestCase):
    def setUp(self):

        #########################
        #   Data Dictionaries   #
        #########################

        self.student_data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        self.company_data = {
            "name": "ABC",
            "category": "S",
            "link": "http://www.abc.com",
        }

        self.data = {
            "title": "ML Dev",
            "vacancies": 23,
            "interview_date": timezone.now(),
            "deadline": timezone.now() + timezone.timedelta(days=1),
            "package": "10 lpa",
        }

        #########################
        #   Creating objects    #
        #########################

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
        self.tpo = User.objects.create_user(
            **self.student_data, email="t@t.com", role="TPO"
        )

        # Creating Tokens
        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        # Creating company
        self.company = Company.objects.create(**self.company_data)

        # Creating position
        self.position = Position.objects.create(**self.data, company=self.company)
        self.data["company"] = self.company.id

        #########################
        #   Defining endpoints  #
        #########################

        self.list_url = reverse("Position-list")
        self.retrieve_url = reverse("Position-detail", kwargs={"pk": self.position.id})

    ###############################
    #   Authenticating the user   #
    ###############################

    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    #############################
    #           Tests           #
    #############################

    # Testing position create view for tpo
    def test_position_create_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Testing position list view for student, co and tpo
    def test_position_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing position detail view for student, co-ordinator and tpo
    def test_position_retreive_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["title"], self.position.title)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing position update view for tpo
    def test_position_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"title": "Web Dev"})
        self.assertEqual(response.data["title"], "Web Dev")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Application Endpoints
class ApplicationViewSetTestCase(APITestCase):
    def setUp(self):

        #########################
        #   Data Dictionaries   #
        #########################

        self.student_data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        self.company_data = {
            "name": "ABC",
            "category": "S",
            "link": "http://www.abc.com",
        }

        self.position_data = {
            "title": "ML Dev",
            "vacancies": 23,
            "interview_date": timezone.now(),
            "deadline": timezone.now(),
            "package": "10 lpa",
        }

        #########################
        #   Creating objects    #
        #########################

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
        self.tpo = User.objects.create_user(
            **self.student_data, email="t@t.com", role="TPO"
        )

        # Creating Tokens
        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.create(user=self.tpo)

        # Creating company
        self.company = Company.objects.create(**self.company_data)

        # Creating position
        self.position = Position.objects.create(
            **self.position_data, company=self.company
        )
        self.position_data["company"] = self.company.id

        # Creating Application
        self.application = Application.objects.create(
            student=self.student, position=self.position
        )
        self.data = {}
        self.data["student"] = self.student.id
        self.data["position"] = self.position.id

        #########################
        #   Defining endpoints  #
        #########################

        self.list_url = reverse("Application-list")
        self.retrieve_url = reverse(
            "Application-detail", kwargs={"pk": self.application.id}
        )

    ###############################
    #   Authenticating the user   #
    ###############################

    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    #############################
    #           Tests           #
    #############################

    # Testing application create view for student
    def test_application_create_student(self):
        self.api_authentication(self.student_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Testing application list view for student, co and tpo
    def test_application_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing application detail view for student, co-ordinator and tpo
    def test_application_retreive_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["student"], self.application.student.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Testing application update view for tpo
    def test_application_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"status": "2"})
        self.assertEqual(response.data["status"], "2")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
