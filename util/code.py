import subprocess
from webbrowser import open
import customtkinter as ctk

window = ctk.CTk()
window.geometry("800x400")
window.title("YouTube Player")
ctk.set_appearance_mode("dark")

url_entry = ctk.CTkEntry(master=window, width=400, placeholder_text="Enter YouTube URL")
url_entry.pack(pady=20)

video_frame = ctk.CTkFrame(master=window, width=600, height=400)
video_frame.pack(pady=20)
video_label = ctk.CTkLabel(
    master=video_frame, text="Video Placeholder", font=("Arial", 20)
)
video_label.pack(fill=ctk.BOTH, expand=True)

control_frame = ctk.CTkFrame(master=window, bg_color="red")
control_frame.pack(fill=ctk.X, side=ctk.BOTTOM)
centered_frame = ctk.CTkFrame(master=control_frame)
centered_frame.pack(fill=ctk.X, expand=True)


def play_video():
    url = url_entry.get()
    download_command = f"python3 -m yt_dlp --no-playlist -o video.%(ext)s {url}"
    subprocess.run(download_command.split())
    open("video.%(ext)s")


play_button = ctk.CTkButton(
    command=play_video,
    master=centered_frame,
    fg_color="red",
    text="Play",
)
play_button.pack(side=ctk.LEFT, padx=10)
progress_bar = ctk.CTkProgressBar(master=centered_frame, progress_color="red")
progress_bar.pack(fill=ctk.X, expand=True)
window.mainloop()


# https://youtu.be/YXhRJyKGgAM?list=TLPQMTQwNTIwMjTXtnWID1SgDA
