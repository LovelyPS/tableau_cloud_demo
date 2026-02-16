from django.urls import path
from .views import tableau_token_view

urlpatterns = [
    path("tableau/token/", tableau_token_view),
]