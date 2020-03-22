from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("students", views.StudentViewSet)
router.register("positions", views.PositionViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("get_xls/<int:company_id>", views.get_xls, name="get_xls"),
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 5c806daf244428047ffa3c99a99bf115c6e3014b
    path("student_signup/", views.StudentSignUpView.as_view(), name="student_signup"),
    path(
        "student_profile/<int:id>",
        views.UpdateStudentViewSet.as_view(),
        name="student_profile",
    ),
    path(
        "coordinator_signup/",
        views.CoordinatorSignUpView.as_view(),
        name="coordinator_signup",
    ),
<<<<<<< HEAD
>>>>>>> upstream/master
=======
>>>>>>> 5c806daf244428047ffa3c99a99bf115c6e3014b
]
