from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.forms import UserCreationForm
from .models import User, Student, Coordinator, Company, Position, Application


class BaseUserAdmin(UserAdmin):
    list_display = ("email", "role")
    search_fields = ("email",)
    readonly_fields = (
        "date_joined",
        "last_login",
    )

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


class StudentAdmin(UserAdmin):
    list_display = ("sap_ID", "department", "year")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


class CoordinatorAdmin(UserAdmin):
    list_display = ("email", "department")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


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


admin.site.unregister(Group)
admin.site.register(User, BaseUserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Coordinator, CoordinatorAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Position, PositionAdmin)
admin.site.register(Application, ApplicationAdmin)
