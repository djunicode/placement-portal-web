from django.urls import path, include
from rest_framework import routers, renderers
from . import views

router = routers.DefaultRouter()
router.register("student_list", views.ListStudentViewSet)
router.register("positions", views.PositionViewSet)

user_profile = views.UpdateStudentViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update"}
)

urlpatterns = [
    path("", include(router.urls)),
    path("get_xls/<int:company_id>", views.get_xls, name="get_xls"),
    path("student_profile/<int:pk>/", user_profile, name="student_profile"),
]
