from django.contrib import admin
from .models import User, Student, Coordinator, Company, Position, Application

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "role")
    search_fields = (
        "email",
        "username",
    )
    readonly_fields = ("date_joined", "last_login", "password")

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


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


admin.site.register(User, UserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Coordinator, CoordinatorAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Position, PositionAdmin)
admin.site.register(Application, ApplicationAdmin)
