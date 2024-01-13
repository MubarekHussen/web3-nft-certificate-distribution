import cv2

users = [
    {"name": "Misganaw Berihun", "email": "msganawberihun10@gmail.com", "date": "January 12, 2024"},
    {"name": "Mubarek Hussen", "email": "mubahussen2014@gmail.com", "date": "January 12, 2024"},
]


def create_certificate(full_name, date):
    certificate_background = cv2.imread("./assets/base_image/certificate.png")
    logo_path = "./assets/images/10x_logo.jpg"
    logo = cv2.imread(logo_path)

    text_size = cv2.getTextSize(full_name, cv2.FONT_HERSHEY_SIMPLEX, 1.5, 2)[0]
    text_x = (certificate_background.shape[1] - text_size[0]) // 2
    text_y = (certificate_background.shape[0] + text_size[1]) // 2 - 70
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
    text_y = (certificate_background.shape[0] + text_size[1]) // 2 - 10
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
    certificate_background[0:height, 0:width] = logo

    cv2.imwrite(f"./assets/certificates/{full_name}_certificate.png", certificate_background)

for user in users:
    create_certificate(user["name"], user["date"])
