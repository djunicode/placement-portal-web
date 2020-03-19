from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator
from .choices import *


from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class MyAccountManager(BaseUserManager):
<<<<<<< HEAD
	def create_user(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('Users must have an email address')
		if not password:
			raise ValueError('Users must have a password')

		user = self.model(
			email=self.normalize_email(email),
			**extra_fields
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, password):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user


class User(AbstractBaseUser):
	email = models.EmailField(verbose_name="email", max_length=60, unique=True)
	username=models.CharField(max_length=40,blank=True,null=True)
	f_name= models.CharField(max_length= 20)
	l_name= models.CharField(max_length= 20)
	date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
	last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
	is_admin = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	role = models.CharField(max_length=7, blank=False, choices=ROLE_CHOICES)
=======
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(email=self.normalize_email(email), username=username,)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email), password=password, username=username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.CharField(max_length=7, blank=False, choices=ROLE_CHOICES)

    def __str__(self):
        return self.user.username
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username",
    ]

<<<<<<< HEAD
	USERNAME_FIELD = "email"
=======
    objects = MyAccountManager()
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3

    def __str__(self):
        return self.email

    # For checking permissions. to keep it simple all admin have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
        return True

    def is_student(self):
        return self.role == "STUDENT"

    def is_coordinator(self):
        return self.role == "CO"

    def is_tpo(self):
        return self.role == "TPO"


class Student(User):
<<<<<<< HEAD
	sap_regex = RegexValidator(
	    regex=r"^\+?6?\d{10,12}$", message="SAP ID must be valid"
	)
	sap_ID = models.CharField(
	    validators=[sap_regex],
	    max_length=12,
	    blank=False,
	    null=False,
	    default=None,
	    unique=True,
	)

	department = models.CharField(max_length=5, blank=False, choices=DEPARTMENT_CHOICES)
	year = models.CharField(max_length=2, blank=False, choices=YEAR_CHOICES)
	Stud_req=['department','year','sap_ID']
	REQUIRED_FIELDS=['username','department','year','sap_ID']
	pointer=models.DecimalField(default=0.00,max_digits=5,decimal_places=2,blank=False,null=False)


class Coordinator(User):
	department = models.CharField(max_length=5, blank=False, choices=DEPARTMENT_CHOICES_COORD)



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)
=======
    sap_regex = RegexValidator(
        regex=r"^\+?6?\d{10,12}$", message="SAP ID must be valid"
    )
    sap_ID = models.CharField(
        validators=[sap_regex],
        max_length=12,
        blank=False,
        null=False,
        default=None,
        unique=True,
    )

    department = models.CharField(max_length=5, blank=False, choices=DEPARTMENT_CHOICES)
    year = models.CharField(max_length=2, blank=False, choices=YEAR_CHOICES)
    Stud_req = ["department", "year", "sap_ID"]
    REQUIRED_FIELDS = ["username", "department", "year", "sap_ID"]


class Coordinator(User):
    department = models.CharField(
        max_length=5, blank=False, choices=DEPARTMENT_CHOICES_COORD
    )


class Company(models.Model):
    name = models.CharField(max_length=128)
    category = models.CharField(max_length=1, choices=CATEGORY_CHOICES)
    link = models.URLField(max_length=200)

    class Meta:
        verbose_name_plural = "companies"

    def __str__(self):
        return self.name


class Position(models.Model):
    title = models.CharField(max_length=128)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="positions"
    )
    vacancies = models.IntegerField(default=0)
    interview_date = models.DateTimeField()
    deadline = models.DateTimeField()
    package = models.CharField(max_length=128)
    details = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title + ", " + self.company.name


class Application(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    position = models.ForeignKey(
        Position, on_delete=models.CASCADE, related_name="applications"
    )
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="1")
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student.username + ", " + self.position.title
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3
