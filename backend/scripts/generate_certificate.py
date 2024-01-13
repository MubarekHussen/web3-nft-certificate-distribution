from openai import OpenAI
import openai
import cv2
import requests
import numpy as np
import os
# from dotenv import load_dotenv

# load_dotenv()
# api_key = os.environ.get("OPENAI_API_KEY")
# openai.api_key = api_key

# client = OpenAI()

# original_prompt = (
#     "Generate a minimalist certificate of completion with a simple and light background, "
#     "a red and gold yellow color scheme, featuring a centered `Certificate of Completion` heading, "
#     "recipient name field, achievement `10 academy awards`, additional text `For week 3 challenges`, "
#     "signatures `Yabebal Fantaye, Scientific Director, co-CEO` and `Arun Sharma, Managing Director, co-CEO`, "
#     "a large centered number `10` at the top, a thin blue border, and modern sans-serif font, "
#     "prioritizing simplicity, negative space, visual balance, and readability. "
# )

# updated_prompt = (
#     "I NEED to test how the tool works with extremely simple prompts. "
#     "DO NOT add any detail, just use it AS-IS: " + original_prompt
# )

# response = client.images.generate(
#     model="dall-e-3",
#     prompt=updated_prompt,
#     size="1024x1024",
#     quality="standard",
#     n=1,
# )

# image_url = response.data[0].url
# image_data = requests.get(image_url).content
# image_np = np.frombuffer(image_data, np.uint8)
# certificate_background = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
# cv2.imwrite("certificate.png", certificate_background)
certificate_background = cv2.imread("certificate.png")

full_name = "Mubarek Hussen"
date = "January 9, 2024"
logo_path = "./assets/images/10x_logo.jpg"
logo = cv2.imread(logo_path)
text_size = cv2.getTextSize(full_name, cv2.FONT_HERSHEY_SIMPLEX, 1.5, 2)[0]
text_x = (certificate_background.shape[1] - text_size[0]) // 2
text_y = (certificate_background.shape[0] + text_size[1]) // 2
cv2.putText(
    certificate_background,
    full_name,
    (text_x, text_y),
    cv2.FONT_HERSHEY_SIMPLEX,
    1.5,
    (0, 0, 0),
    2,
)
text_size = cv2.getTextSize(date, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)[0]
text_x = (certificate_background.shape[1] - text_size[0]) // 2
text_y = (
    certificate_background.shape[0] + text_size[1]
) // 2 + 60
cv2.putText(
    certificate_background,
    date,
    (text_x, text_y),
    cv2.FONT_HERSHEY_SIMPLEX,
    1,
    (0, 0, 0),
    2,
)
logo = cv2.resize(logo, (100, 100))
height, width, _ = logo.shape
certificate_background[
    0:height, 0:width
] = logo
cv2.imwrite("final_certificate.png", certificate_background)