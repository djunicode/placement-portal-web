from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("student_list", views.ListStudentViewSet)
router.register("student_profile", views.UpdateStudentViewSet)
router.register("positions", views.PositionViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("get_xls/<int:company_id>", views.get_xls, name="get_xls"),
]
