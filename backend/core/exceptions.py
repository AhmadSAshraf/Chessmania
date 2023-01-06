from rest_framework.exceptions import APIException


class APIException404(APIException):
    status_code = 404


class APIException400(APIException):
    status_code = 400
