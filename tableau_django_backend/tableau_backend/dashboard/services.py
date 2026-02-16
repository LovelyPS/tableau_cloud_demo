import uuid

import jwt
import datetime
from django.conf import settings


def generate_tableau_jwt(user_identifier="external_user"):
    now = datetime.datetime.utcnow()

    payload = {
        "iss": settings.TABLEAU_CLIENT_ID,
        "sub": "lovely.saimon@predigle.com",
        "aud": "tableau",
        "exp": now + datetime.timedelta(minutes=5),
        "jti": f"{user_identifier}-{now.timestamp()}",
        "scp": ["tableau:views:embed"],
        "https://tableau.com/site": settings.TABLEAU_SITE,
        "https://tableau.com/oda": "true",
    }

    # token = jwt.encode(
    #     payload,
    #     settings.TABLEAU_CLIENT_SECRET,
    #     algorithm="HS256"
    # )
    token = jwt.encode(
        {
            "iss": settings.TABLEAU_CLIENT_ID,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=1),
            "jti": str(uuid.uuid4()),
            "aud": "tableau",
            "sub": "lovely.saimon@predigle.com",
            "scp": ["tableau:views:embed", "tableau:metrics:embed","tableau:content:read"]
            ,

        },
        settings.TABLEAU_CLIENT_SECRET,
        algorithm="HS256",
        headers={
            'kid': "faf35fb8-46c8-438a-8000-76f89b7a7771",
            'iss': settings.TABLEAU_CLIENT_ID
        }
    )

    return token