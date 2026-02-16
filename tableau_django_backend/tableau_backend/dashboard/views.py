from django.http import JsonResponse
from .services import generate_tableau_jwt


def tableau_token_view(request):
    # Optional: validate logged-in user here
    user_identifier = "lovely.saimon@predigle.com"

    token = generate_tableau_jwt(user_identifier)

    return JsonResponse({"token": token})
