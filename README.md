
# Build your own time tracking with this Template 
<img src="zeitag.png">
<br/>
Your goal is to implement a Fullstack Solution for TimeTracking.

1. Clone this Repository to your own GitHub Account (Clone a new Repo for this).
2. Install the needed tools as mentioned down to get ready to code
3. Create new Model for TimeTracking (explained below)
4. Display all Entries in an Grid for one day (feel free about looks)
5. Implement Navigation of different days (Daypicker)
6. Implement CRUD Operations Fullstack from Database to WebUI
7. Show Summarized Values of all BookingTypes for this specific day

### Model for TimeTracking:
- PersonId
- Date / Time Start of Record UTC
- Date / time End of Record UTC
- Short Description of Entry (at least 40 Chars)
- Type of Booking (references to BookingTypes)

### Model for BookingTypes
- BookingTypeId
- Description

### Entries for BookingTypes:
- Working Hours
- Break
- Absence Sickness/Accident
- Paid Abesence
- Unpaid Absence

 

## Technologies

* [ASP.NET Core 7](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core)
* [Entity Framework Core 7](https://docs.microsoft.com/en-us/ef/core/)
* [Angular 14](https://angular.io/)
* [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [NUnit](https://nunit.org/), [FluentAssertions](https://fluentassertions.com/), [Moq](https://github.com/moq) & [Respawn](https://github.com/jbogard/Respawn)

## Getting Started

1. Install the latest [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
2. Install the latest [Node.js LTS](https://nodejs.org/en/)
3. Use VSCode, VisualStudio or Jetbrains Rider as Environment as you like
4. Navigate to `src/WebUI` and launch the project using `dotnet run`

## Overview

### Domain

This will contain all entities, enums, exceptions, interfaces, types and logic specific to the domain layer.

### Application

This layer contains all application logic. It is dependent on the domain layer, but has no dependencies on any other layer or project. This layer defines interfaces that are implemented by outside layers. For example, if the application need to access a notification service, a new interface would be added to application and an implementation would be created within infrastructure.

### Infrastructure

This layer contains classes for accessing external resources such as file systems, web services, smtp, and so on. These classes should be based on interfaces defined within the application layer.

### WebUI

This layer is a single page application based on Angular 14 and ASP.NET Core 7. This layer depends on both the Application and Infrastructure layers, however, the dependency on Infrastructure is only to support dependency injection. Therefore only *Startup.cs* should reference Infrastructure.
