# CoDash - Cross Platform COVID-19 app <img align="right" width="300" src="./assets/CoDash.png" alt="CoDash Logo">

CoDash is a cross-platform, stable and secure COVID-19 monitoring app, dedicated to putting everything that you need about COVID-19 into one app. CoDash has public API endpoints that follow CDC guidelines that are always updated with the change of a JSON file. Perform self-assessments following the CDC guidelines, see COVID-19 cases by country or globally, read current news, and do such more. CoDash is built in Kotlin, C#, C++, TypeScript and Swift, and is available on Android, Windows 10, iOS, WearOS, with future support for Linux. CoDash is powered by the different assortments of APIs, from https://covid19api.com, https://ourworldindata.org, and others. CoDash is not yet fully developed, and it won't be for a while. Hang tight, greatness is coming.

# CoDash API
CoDash isn't exactly it's own service, it uses a collection of different APIs, however we modify the data that these providers give to us. However, we do offer a public API for anyone to use. This API has key and IP based rate limits, with a value of 25 requests per hour. In the future, CoDash may increase this limit if we have better hosting providers. All of our endpoints can be found in the [API docs](docs/api.md). All endpoints have a base URL of https://codash.xyz/api/public/.

# Getting the source.
CoDash doesn't require any external tools for getting the source except for Git. All you have to do is run `git clone https://github.com/codashapp/codash.git` in your terminal to get the source. Our only requirement for IDE usage is you must use Android Studio for Android development, VS2019/VS2022 for Windows/Linux development. If you're making a commit that changes the algorithm for our SmartCovDetector AI, your PR may take a while to be merged.