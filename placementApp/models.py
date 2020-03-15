from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator


class MyAccountManager(BaseUserManager):
	def create_user(self, email, username, password=None):
		if not email:
			raise ValueError('Users must have an email address')
		if not username:
			raise ValueError('Users must have a username')

		user = self.model(
			email=self.normalize_email(email),
			username=username,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, username, password):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
			username=username,
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
	ROLE_CHOICES = [("STUDENT", "Student"), ("CO", "Co-ordinator"), ("TPO", "TPO")]
	role = models.CharField(max_length=7, blank=False, choices=ROLE_CHOICES)

	def __str__(self):
	    return self.user.username

	USERNAME_FIELD = "email"
	REQUIRED_FIELDS = ['username',]

	objects = MyAccountManager()

	def __str__(self):
	    return self.email

	# For checking permissions. to keep it simple all admin have ALL permissons
	def has_perm(self, perm, obj=None):
	    return self.is_admin

	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
	def has_module_perms(self, app_label):
	    return True


class Student(User):
	DEPARTMENT_CHOICES = [
	    ("COMPS", "Computer"),
	    ("IT", "Information Technology"),
	    ("EXTC", "Electronics & Telecommunication"),
	    ("PROD", "Production"),
	    ("MECH", "Mechanical"),
	    ("BIO", "Biomedical"),
	    ("ELEX", "Electronics"),
	    ("CHEM", "Chemical"),
	]
	YEAR_CHOICES = [("TE", "Third Year"), ("BE", "Fourth Year")]

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


class Coordinator(User):
    DEPARTMENT_CHOICES = [
        ("COMPS", "Computer"),
        ("IT", "Information Technology"),
        ("EXTC", "Electronics & Telecommunication"),
        ("PROD", "Production"),
        ("MECH", "Mechanical"),
        ("BIO", "Biomedical"),
        ("ELEX", "Electronics"),
        ("CHEM", "Chemical"),
        ("HUM", "Science & Humanities"),
    ]

    department = models.CharField(max_length=5, blank=False, choices=DEPARTMENT_CHOICES)
