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

    """ Tests for Signup endpoint
    Create: Student, Co-ordinator   
    """

    def test_student_signup(self):  # Testing student signup endpoint
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

    def test_coordinator_signup(self):  # Testing coordinator signup endpoint
        data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "email": "sakshiuppoor@djsce.ac.in",
            "department": "COMPS",
            "password": "pass@123",
            "password2": "pass@123",
        }
        response = self.client.post("/coordinator_signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# Student Endpoints
class StudentProfileViewSetTestCase(APITestCase):
    def setUp(self):

        """ Data Dictionaries:
        Student,
        """

        self.data = {
            "f_name": "Sakshi",
            "l_name": "Uppoor",
            "password": "pass@123",
        }

        """Creating objects
        Users: Student, Co-ordinator, TPO
        Tokens: Student, Co-ordinator, TPO
        """

        self.student = Student.objects.create_user(
            **self.data,
            email="s@s.com",
            role="STUDENT",
            sap_ID="60004180090",
            pointer="9.30",
            department="COMPS",
            year="BE"
        )

        self.co = Coordinator.objects.create_user(
            **self.data, email="c@c.com", role="CO", department="COMPS"
        )

        self.tpo = User.objects.create_user(**self.data, email="t@t.com", role="TPO")

        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.get(user=self.tpo)

        """Defining endpoints:
        List & Detail
        """

        self.list_url = reverse("Student-list")
        self.retrieve_url = reverse("Student-detail", kwargs={"pk": self.student.id})

    def api_authentication(self, token):  # Authenticating the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    """ Tests for Student Profile Viewset
    List: Student, Co-ordinator, TPO  
    Retreive: Student owner, Co-ordinator, TPO  
    Update: Student owner 
    """

    def test_student_list_co_tpo(self):
        self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_retreive_studentowner_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["email"], self.student.email)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_update_studentowner(self):
        self.api_authentication(self.student_token)
        response = self.client.patch(
            "/student_profile/" + str(self.student.id), {"email": "test@test.com"}
        )
        self.assertEqual(response.data["email"], "test@test.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Company Endpoints
class CompanyViewSetTestCase(APITestCase):
    def setUp(self):

        """ Data Dictionaries:
        Student,
        Company
        """

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

        """Creating objects
        Users: Student, Co-ordinator, TPO
        Tokens: Student, Co-ordinator, TPO
        Company
        """

        self.student = Student.objects.create_user(
            **self.student_data,
            email="s@s.com",
            role="STUDENT",
            sap_ID="60004180090",
            pointer="9.30",
            department="COMPS",
            year="BE"
        )

        self.co = Coordinator.objects.create_user(
            **self.student_data, email="c@c.com", role="CO", department="COMPS"
        )

        self.tpo = User.objects.create_user(
            **self.student_data, email="t@t.com", role="TPO"
        )

        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.get(user=self.tpo)

        self.company = Company.objects.create(**self.data)

        """Defining endpoints:
        List & Detail
        """

        self.list_url = reverse("Company-list")
        self.retrieve_url = reverse("Company-detail", kwargs={"pk": self.company.id})

    def api_authentication(self, token):  # Authenticating the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    """ Tests for Company Viewset
    Create: TPO
    List, Retreive: Student, Co-ordinator, TPO   
    Update: TPO
    """

    def test_company_create_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_company_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_company_retreive_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["name"], self.company.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_company_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"name": "XYZ"})
        self.assertEqual(response.data["name"], "XYZ")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Position Endpoints
class PositionViewSetTestCase(APITestCase):
    def setUp(self):

        """ Data Dictionaries:
        Student,
        Company,
        Positions
        """

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

        """Creating objects
        Users: Student, Co-ordinator, TPO
        Tokens: Student, Co-ordinator, TPO
        Company
        Position
        """

        self.student = Student.objects.create_user(
            **self.student_data,
            email="s@s.com",
            role="STUDENT",
            sap_ID="60004180090",
            pointer="9.30",
            department="COMPS",
            year="BE"
        )

        self.co = Coordinator.objects.create_user(
            **self.student_data, email="c@c.com", role="CO", department="COMPS"
        )

        self.tpo = User.objects.create_user(
            **self.student_data, email="t@t.com", role="TPO"
        )

        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.get(user=self.tpo)

        self.company = Company.objects.create(**self.company_data)

        self.position = Position.objects.create(**self.data, company=self.company)
        self.data["company"] = self.company.id

        """Defining endpoints:
        List & Detail
        """

        self.list_url = reverse("Position-list")
        self.retrieve_url = reverse("Position-detail", kwargs={"pk": self.position.id})

    def api_authentication(self, token):  # Authenticating the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    """ Tests for Position Viewset
    Create: TPO
    List, Retreive: Student, Co-ordinator, TPO   
    Update: TPO
    """

    def test_position_create_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_position_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_position_retreive_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["title"], self.position.title)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_position_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"title": "Web Dev"})
        self.assertEqual(response.data["title"], "Web Dev")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Application + Excel sheet Endpoints
class ApplicationViewSetTestCase(APITestCase):
    def setUp(self):

        """ Data Dictionaries:
        Student,
        Company,
        Positions
        """

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

        self.position2_data = {
            "title": "Full Stack Dev",
            "vacancies": 23,
            "interview_date": timezone.now(),
            "deadline": timezone.now(),
            "package": "10 lpa",
        }

        """Creating objects
        Users: Student, Co-ordinator, TPO
        Tokens: Student, Co-ordinator, TPO
        Company
        Positions: ML Dev, Full Stack Dev
        Application
        """

        self.student = Student.objects.create_user(
            **self.student_data,
            email="s@s.com",
            role="STUDENT",
            sap_ID="60004180090",
            pointer="9.30",
            department="COMPS",
            year="BE"
        )

        self.co = Coordinator.objects.create_user(
            **self.student_data, email="c@c.com", role="CO", department="COMPS"
        )

        self.tpo = User.objects.create_user(
            **self.student_data, email="t@t.com", role="TPO"
        )

        self.student_token = Token.objects.create(user=self.student)
        self.co_token = Token.objects.create(user=self.co)
        self.tpo_token = Token.objects.get(user=self.tpo)

        self.company = Company.objects.create(**self.company_data)

        self.position = Position.objects.create(
            **self.position_data, company=self.company
        )
        self.position_data["company"] = self.company.id

        self.position2 = Position.objects.create(
            **self.position2_data, company=self.company
        )
        self.position2_data["company"] = self.company.id

        self.application = Application.objects.create(
            student=self.student, position=self.position
        )
        self.data = {}
        self.data["student"] = self.student.id
        self.data["position"] = self.position2.id

        """Defining endpoints:
        List & Detail
        """

        self.list_url = reverse("Application-list")
        self.retrieve_url = reverse(
            "Application-detail", kwargs={"pk": self.application.id}
        )

    def api_authentication(self, token):  # Authenticating the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    """ Tests for Application Viewset
    Create: Student
    List, Retreive: Student, Co-ordinator, TPO   
    Update: TPO
    Get Excel Sheet: Co-ordinator & TPO
    """

    def test_application_create_student(self):
        self.api_authentication(self.student_token)
        response = self.client.post(self.list_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_application_list_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_application_retreive_student_co_tpo(self):
        self.api_authentication(self.student_token)
        # self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get(self.retrieve_url)
        self.assertEqual(response.data["student"], self.application.student.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_application_update_tpo(self):
        self.api_authentication(self.tpo_token)
        response = self.client.patch(self.retrieve_url, {"status": "2"})
        self.assertEqual(response.data["status"], "2")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_xls_co_tpo(self):
        self.api_authentication(self.co_token)
        # self.api_authentication(self.tpo_token)
        response = self.client.get("/get_xls/" + str(self.company.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
