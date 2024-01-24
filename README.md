# ArtiVerse

Folder structure:

```
ArtiVerse
├───code
│   ├───.env copy (This is the file that contains the API keys)
│   ├───app.py (This is the main file that contains the code for the app)
│   ├───requirements.txt (This file contains the required packages)
├───static
│   ├───Gen (Contains the css, fonts, img and js files of the generate.html page)
│   ├───images (Contains the images of the home page)
│   ├───Pro (Contains the css, fonts, img and js files of the product.html page)
│   ├───styles (Contains the css files of the Chat & Img generation page)
│   └───js (Contains the js files of the home page)
├───templates
│   ├───demo.html (This is the chat page)
│   ├───generate.html (This is the image generation page)
│   ├───index.html (This is the home page)
│   ├───product.html (This is the chat product page)
│   └───product2.html (This is the image generation product page)
├───License
├───README.md
```

## 🎉 The App features.

-   [x] Chat Feature (Clear, Send, Export)
-   [x] Multilingual Support (Using OpenAPI)
-   [x] Beautiful UI (Using Bootstrap)
-   [x] User Feedback and Customization (To Do)
-   [x] Text to Image (Using Langchain + Diffusion Models)
-   [x] Add Summarization (Using Cohere API) [To Be Decided]

## Tasks

-   [x] Chat Feature (Clear, Send, Export)
-   [x] Different Language Support (Using OpenAI API)
-   [x] User Feedback and Customization (To Do)
-   [x] Text to Image (Using Langchain + Diffusion Models)
-   [x] Add Summarization (Using OpenAPI / Cohere API)
-   [x] Add a landing page
-   [x] Add a Product Page
-   [x] Add a Chat Page
        [x] Add a Chatbox
        [x] Add a Settings Option to select the language
        [x] Add a Clear, Send, Export Button
-   [x] Add support for mobile devices
-   [x] Provide the insights on the user and their uses

## How to run the project

1. Clone the repository
2. Open the terminal and navigate to the code folder
3. Run the following command to install the required packages

```
pip install -r requirements.txt
```

4. Run the following command to run the app

```
python app.py
```

5. Open the browser and go to the following link

```
http://127:0.0.1:8000
```

6. Enjoy the app

## Deployment

-   for local and for hub:

```bash
docker build -t artiverse .
```

```bash
docker push devm17/artiverse:latest
```

-   Set GCP project:

```bash
gcloud config set project artiverse-395608
```

-   for gcp, use:-

```bash
docker build -t devm17/artiverse:latest . --no-cache=true --platform=linux/amd64
```

-   testing:

```bash
docker run -p 8080:8080 artiverse
```

-   Create a repository on GCP

```bash
gcloud beta artifacts repositories create artiverse-repo --repository-format=docker --location=us-central1 --description="ArtiVerse Flask app repository"
```

-   Push the image to the repository

```bash
docker tag devm17/artiverse us-central1-docker.pkg.dev/artiverse-395608/artiverse-repo/artiverse:latest
```

```bash
docker push us-central1-docker.pkg.dev/artiverse-395608/artiverse-repo/artiverse
```

-   Deploy the image to Cloud Run

```bash
gcloud run deploy artiverse --image us-central1-docker.pkg.dev/artiverse-395608/artiverse-repo/artiverse --platform managed --region us-central1
```

## Deployment on GCP

https://artiverse-dxesc7ry2a-uc.a.run.app/ [Currently disabled]
