from django.contrib import admin
from .models import User, Student, Coordinator
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.forms import UserCreationForm


# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "role")
    search_fields = ('email',)
    readonly_fields = ('date_joined', 'last_login',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

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


admin.site.unregister(Group)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Coordinator, CoordinatorAdmin)
