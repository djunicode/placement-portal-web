from rest_framework.permissions import BasePermission, SAFE_METHODS

# from customer.models import User


class IsTPOOrOwner(BasePermission):
    message = "You do not have the permission to perform this action."

    def has_permission(self, request, view):
        if request.user.is_student() and view.action == "list":
            return False
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id or request.user.is_tpo()


class IsTPOOrReadOnly(BasePermission):
    message = "You do not have the permission to perform this action."

    def has_permission(self, request, view):
        if view.action == "create":
            return request.user.is_tpo()
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action == "retrieve":
            return True
        return request.user.is_tpo()


class IsStaff(BasePermission):
    message = "You do not have the permission to perform this action."

    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_co() or request.user.is_tpo()
        )

    def has_object_permission(self, request, view, obj):
        return True


class ApplicationPermissions(BasePermission):
    message = "You do not have the permission to perform this action."

    def has_permission(self, request, view):
        if view.action == "create":
            return request.user.is_student()

        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action == "retrieve":
            return request.user.is_authenticated

        return request.user.is_tpo()


class IsStudentOrReadOnly(BasePermission):
    message = "You do not have required permission to perform this action"

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method == "retrieve":
            return request.user.is_authenticated
        print(obj)
        return request.user.is_student() and obj.email == request.user.email
