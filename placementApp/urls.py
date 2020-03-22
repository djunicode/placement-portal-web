from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("students", views.StudentViewSet)
router.register("positions", views.PositionViewSet)
router.register("company", views.CompanyViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("get_xls/<int:company_id>", views.get_xls, name="get_xls"),
]
