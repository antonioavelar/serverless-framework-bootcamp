curl --location --request POST 'https://dev-u6zv7q-v.eu.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=$CLIENT_ID' \
--data-urlencode 'username=$USERNAME' \
--data-urlencode 'password=$PASSOWRD' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'scope=openid'