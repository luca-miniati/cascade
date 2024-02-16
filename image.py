import requests
import base64
from PIL import Image
from io import BytesIO

def convert_to_png(image_url):
    try:
        # Fetch the image from the specified URL
        response = requests.get(image_url)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch image from {image_url}. Status code: {response.status_code}")

        # Open the image using PIL
        img = Image.open(BytesIO(response.content))

        # Create a buffer to hold PNG image data
        png_buffer = BytesIO()

        # Convert the image to PNG format
        img.save(png_buffer, format="PNG")

        # Get the PNG image data
        png_data = png_buffer.getvalue()

        # Encode the PNG image data in base64 format
        png_base64 = base64.b64encode(png_data).decode('utf-8')

        return png_base64
    except Exception as e:
        print(f"Error: {e}")
        return None

def generate_shields_badge(image_url, badge_label, badge_color):
    try:
        # Convert the image to PNG format
        png_base64 = convert_to_png(image_url)
        if not png_base64:
            return None

        # Generate the shields.io badge URL with PNG format
        badge_url = f"https://img.shields.io/badge/{badge_label}-{badge_color}.png?logo=data:image/png;base64,{png_base64}"

        return badge_url
    except Exception as e:
        print(f"Error: {e}")
        return None

# Example usage
image_url = "https://www.gitbook.com/cdn-cgi/image/width=36,dpr=2,height=36,fit=contain,format=auto/https%3A%2F%2F21962985-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MB05JeHIrR5pfcM-_7L%252Favatar-1596932100735.png%3Fgeneration%3D1596932101339988%26alt%3Dmedia"
badge_label = "Your Label"
badge_color = "green"

badge_url = generate_shields_badge(image_url, badge_label, badge_color)
if badge_url:
    print(badge_url)
else:
    print("Failed to generate shields.io badge URL.")
