# API Documentation (OUTDATED)

## User Controller -

> ### User DTO -
>
> ```json
> {
>   "userId": "Not required, generated from token",
>   "auth0Id": "Not required, retrieved from token"
> }
> ```
>
> ### Base Route - <http://localhost:8080/bored-gamerz/api/user>
>
> GET <http://localhost:8080/bored-gamerz/api/user>,  
> returns all user profiles from the database.
>
> GET <http://localhost:8080/bored-gamerz/api/user/me>,  
> returns your user profile id, auth0id, and salt.
>
> DELETE <http://localhost:8080/bored-gamerz/api/user/me>,  
> deletes your user profile.
>
> POST <http://localhost:8080/bored-gamerz/api/user>,  
> requires nothing, just make a post call with a valid id token
>
## Game Meeting Controller -

> ### Game Meeting DTO -
>
> ```json
> {
>   "id": "only required when updating",
>   "title": "Always required",
>   "description": "Always required",
>   "gameName": "Always required",
>   "category": "Always required",
>   "availableSeats": "Always required",
>   "address": "Always required",
>   "date": "Always required, needs to be in milliseconds",
>   "hostId": "Not required, retrieved from token"
> }
> ```
>
> ### Base Route - <http://localhost:8080/bored-gamerz/api/game-meeting>
>
> GET <http://localhost:8080/bored-gamerz/api/game-meeting>,  
> returns all game meetings from the database.
>
> GET <http://localhost:8080/bored-gamerz/api/game-meeting/{UUID}>,  
> returns the game meeting with matching id.
>
> GET <http://localhost:8080/bored-gamerz/api/game-meeting/me>,  
> returns all game meetings by you.
>
> DELETE <http://localhost:8080/bored-gamerz/api/game-meeting/{UUID}>,  
> deletes the game meeting with matching id.
>
> POST <http://localhost:8080/bored-gamerz/api/game-meeting>,  
> requires a game meeting DTO request body, adds a new game meeting to the database.
>
> PUT <http://localhost:8080/bored-gamerz/api/game-meeting>,  
> requires a game meeting DTO request body with a UUID, updates the game meeting with the matching UUID with new assets from the request body

> ### User to Game Meeting DTO
>
> ```json
> {
>   "userId": "Not required, retrieved from token",
>   "gameMeetingId": "Always required"
> }
> ```
>
> ### Base Route - <http://localhost:8080/bored-gamerz/api/user-to-game-meeting>
>
> GET <http://localhost:8080/bored-gamerz/api/user-to-game-meeting>,  
> returns all seats.
>
> GET <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/{id}>,  
> return the seat with matching composite id.
>
> GET <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/me>,  
> returns all seats your user has filled.
>
> GET <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/game-meeting/{UUID}>,  
> returns all seats that are currently filled in a specific game.
>
> DELETE <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/unjoin>,  
> requires a user to game meeting DTO request body, unjoins user from a specified game.
>
> POST <http://localhost:8080/bored-gamerz/api/user-to-game-meeting>,  
> requires a user to game meeting DTO request body, joins user to a specified game.
