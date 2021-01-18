# API Documentation

## User Controller -

> ### User DTO -
>
> ```json
> {
>   "userId": "Only required for updating a profile",
>   "username": "Always required",
>   "email": "Always required",
>   "firstName": "Always required",
>   "lastName": "Always required",
>   "country": "Always required"
> }
> ```
>
> ### Base Route - <http://localhost:8080/bored-gamerz/api/user>
>
> GET <http://localhost:8080/bored-gamerz/api/user>,  
> returns all user profiles from the database.
>
> GET <http://localhost:8080/bored-gamerz/api/user/{email}>,  
> returns the user profile with matching email.
>
> GET <http://localhost:8080/bored-gamerz/api/user/id/{UUID}>,  
> returns the user profile with matching id.
>
> DELETE <http://localhost:8080/bored-gamerz/api/user/id/{UUID}>,  
> deletes the user profile with matching id.
>
> POST <http://localhost:8080/bored-gamerz/api/user>,  
> requires a user DTO request body, adds a new user to the database.
>
> PUT <http://localhost:8080/bored-gamerz/api/user>,  
> requires a user DTO request body with a UUID, updates the user profile with the matching UUID with new attributes from the request body.

## Game Meeting Controller -

> ### Game Meeting DTO -
>
> ```json
> {
>   "title": "Always required",
>   "description": "Always required",
>   "gameName": "Always required",
>   "category": "Always required",
>   "availableSeats": "Always required",
>   "address": "Always required",
>   "date": "Always required",
>   "hostId": "Always required"
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
> GET <http://localhost:8080/bored-gamerz/api/game-meeting/host/{UUID}>,  
> returns all game meetings by a specific host.
>
> DELETE <http://localhost:8080/bored-gamerz/api/game-meeting/{UUID}>,  
> deletes the game meeting with matching id.
>
> POST <http://localhost:8080/bored-gamerz/api/game-meeting>,  
> requires a game meeting DTO request body, adds a new game meeting to the database.
>
> PUT <http://localhost:8080/bored-gamerz/api/game-meeting>,  
> requires a game meeting MODEL request body with a UUID, updates the game meeting with the matching UUID with new assets from the request body, this is not yet safe to use, updating a game meeting is more complicated than the user and we need to decide as a group what should be updatable in the object.
## User to Game Meeting Join Controller -

> ### User to Game Meeting DTO
>
> ```json
> {
>   "userId": "Always required",
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
> GET <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/user/{UUID}>,  
> returns all seats the specified user has filled.
>
> GET <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/game-meeting/{UUID}>,  
> returns all seats that are currently filled in a specific game.
>
> DELETE <http://localhost:8080/bored-gamerz/api/user-to-game-meeting/unjoin>,  
> requires a user to game meeting DTO request body, unjoins user from a specified game.
>
> POST <http://localhost:8080/bored-gamerz/api/user-to-game-meeting>,  
> requires a user to game meeting DTO request body, joins user to a specified game.
