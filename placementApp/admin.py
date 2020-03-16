from django.contrib import admin
from .models import User, Student, Coordinator

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "role")
    search_fields = ('email', 'username',)
    readonly_fields = ('date_joined', 'last_login','password')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class StudentAdmin(admin.ModelAdmin):
    list_display = ("sap_ID", "email", "department", "year")
    search_fields = ('username','sap_ID')


class CoordinatorAdmin(admin.ModelAdmin):
    list_display = ( "email", "department")
    search_fields = ('username',)


admin.site.register(User, UserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Coordinator, CoordinatorAdmin)
