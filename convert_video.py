import subprocess
import os

# Define paths
input_path = os.path.join('public', 'resources', 'video.mkv')
output_path = os.path.join('public', 'resources', 'video.mp4')

# Check if input file exists
if not os.path.exists(input_path):
    print(f"Error: Input file not found at {input_path}")
    exit(1)

# FFmpeg command
# Using libx264 for video and aac for audio for best web compatibility
# -movflags +faststart moves metadata to the beginning for faster web playback
command = [
    'ffmpeg',
    '-i', input_path,
    '-c:v', 'libx264',     # H.264 video codec
    '-preset', 'fast',     # Encoding speed
    '-c:a', 'aac',         # AAC audio codec
    '-b:a', '128k',        # Audio bitrate
    '-movflags', '+faststart', # Optimize for web streaming
    '-y',                  # Overwrite output file if it exists
    output_path
]

print(f"Starting conversion: {input_path} -> {output_path}")
print("Please wait, this might take a moment...")

try:
    # Run the command
    result = subprocess.run(command, check=True, capture_output=True, text=True)
    print("Conversion successful!")
    print(f"Video saved to: {output_path}")
except subprocess.CalledProcessError as e:
    print("Error during conversion:")
    print(e.stderr)
    exit(1)
except FileNotFoundError:
    print("Error: ffmpeg is not installed or not in the system PATH.")
    exit(1)
