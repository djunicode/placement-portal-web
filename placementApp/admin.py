from django.contrib import admin
<<<<<<< HEAD
from .models import User, Student, Coordinator
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.forms import UserCreationForm

=======
from .models import User, Student, Coordinator, Company, Position, Application
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3

# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "role")
<<<<<<< HEAD
    search_fields = ('email',)
    readonly_fields = ('date_joined', 'last_login',)
=======
    search_fields = (
        "email",
        "username",
    )
    readonly_fields = ("date_joined", "last_login", "password")
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

<<<<<<< HEAD
class StudentAdmin(UserAdmin):
    list_display = ("sap_ID",  "department", "year")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


class CoordinatorAdmin(UserAdmin):
    list_display = ( "email", "department")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
=======

class StudentAdmin(admin.ModelAdmin):
    list_display = ("sap_ID", "email", "department", "year")
    search_fields = ("username", "sap_ID")


class CoordinatorAdmin(admin.ModelAdmin):
    list_display = ("email", "department")
    search_fields = ("username",)


class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "link")
    search_fields = ("name", "category")


class PositionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "company",
        "vacancies",
        "package",
        "interview_date",
        "deadline",
    )
    search_fields = ("title", "company")


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("student", "position", "submitted_at", "status")
    search_fields = ("student", "position")
>>>>>>> 50f0c0ad10965cac0165139674d909aef09057a3


admin.site.unregister(Group)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Coordinator, CoordinatorAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Position, PositionAdmin)
admin.site.register(Application, ApplicationAdmin)
