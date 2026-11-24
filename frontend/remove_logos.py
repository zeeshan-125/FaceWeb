import cv2
import numpy as np

# Load the ORIGINAL image
src = r'C:\Users\khanz\.gemini\antigravity-ide\brain\79600d26-8e9b-4085-ae39-9261c274aa7f\face_hydrojetting_1790577356787.jpg'
img = cv2.imread(src)
if img is None:
    print("ERROR: Could not load image!")
    exit()

h, w = img.shape[:2]
print(f"Image size: {w}x{h}")

result = img.copy()

# ============================================================
# STRATEGY: Clone-stamp clean metal texture over the logos
# Sample from a clean area of the SAME armor plate and paste it
# ============================================================

# BACK PLATE LOGO REMOVAL
# The back armor plate is a large silver/brushed metal shield
# Logo region: roughly x=[820,1005], y=[375,498] in 1376x768 image
# Clean metal source: sample from the LOWER portion of the same plate
# (below the logo, same plate material)

# Define logo destination region (where logo is)
back_dst_x1, back_dst_y1 = 820, 375
back_dst_x2, back_dst_y2 = 1005, 498

logo_h = back_dst_y2 - back_dst_y1  # 123
logo_w = back_dst_x2 - back_dst_x1  # 185

# Sample clean metal from BELOW the logo on the same plate
# The plate extends below the logo - let's sample from y=[510,633]
back_src_y1 = 510
back_src_y2 = back_src_y1 + logo_h
back_src_x1 = back_dst_x1
back_src_x2 = back_dst_x2

print(f"Back - sampling from: ({back_src_x1},{back_src_y1}) to ({back_src_x2},{back_src_y2})")

# Get the clean patch from below
clean_patch = img[back_src_y1:back_src_y2, back_src_x1:back_src_x2].copy()

# Paste it over the logo area
result[back_dst_y1:back_dst_y2, back_dst_x1:back_dst_x2] = clean_patch

# Now feather the edges with a mask to blend smoothly
# Create an alpha mask (soft edges)
alpha = np.ones((logo_h, logo_w), dtype=np.float32)
feather = 20  # feather width in pixels
for i in range(feather):
    fade = (i / feather)
    alpha[i, :] *= fade          # top edge
    alpha[logo_h-1-i, :] *= fade  # bottom edge
    alpha[:, i] *= fade          # left edge
    alpha[:, logo_w-1-i] *= fade  # right edge

alpha = np.clip(alpha, 0, 1)
alpha_3ch = np.stack([alpha, alpha, alpha], axis=2)

# Blend: result = alpha * clean_patch + (1-alpha) * original
blend = (alpha_3ch * clean_patch.astype(np.float32) + 
         (1 - alpha_3ch) * img[back_dst_y1:back_dst_y2, back_dst_x1:back_dst_x2].astype(np.float32))
result[back_dst_y1:back_dst_y2, back_dst_x1:back_dst_x2] = blend.astype(np.uint8)

# ============================================================
# THIGH LOGO REMOVAL
# The thigh also has silver armor plate material
# Logo region: x=[1105,1172], y=[588,670]
# ============================================================

thigh_dst_x1, thigh_dst_y1 = 1105, 588
thigh_dst_x2, thigh_dst_y2 = 1172, 670

th_h = thigh_dst_y2 - thigh_dst_y1  # 82
th_w = thigh_dst_x2 - thigh_dst_x1  # 67

# Sample from ABOVE the logo on the same thigh plate
thigh_src_y1 = thigh_dst_y1 - th_h - 5
thigh_src_y2 = thigh_dst_y1 - 5
thigh_src_x1 = thigh_dst_x1
thigh_src_x2 = thigh_dst_x2

print(f"Thigh - sampling from: ({thigh_src_x1},{thigh_src_y1}) to ({thigh_src_x2},{thigh_src_y2})")

clean_thigh = img[thigh_src_y1:thigh_src_y2, thigh_src_x1:thigh_src_x2].copy()

# Paste
result[thigh_dst_y1:thigh_dst_y2, thigh_dst_x1:thigh_dst_x2] = clean_thigh

# Feather blend for thigh
alpha_t = np.ones((th_h, th_w), dtype=np.float32)
ft = 10
for i in range(ft):
    fade = i / ft
    alpha_t[i, :] *= fade
    alpha_t[th_h-1-i, :] *= fade
    alpha_t[:, i] *= fade
    alpha_t[:, th_w-1-i] *= fade

alpha_t = np.clip(alpha_t, 0, 1)
alpha_t_3ch = np.stack([alpha_t, alpha_t, alpha_t], axis=2)

blend_t = (alpha_t_3ch * clean_thigh.astype(np.float32) + 
           (1 - alpha_t_3ch) * img[thigh_dst_y1:thigh_dst_y2, thigh_dst_x1:thigh_dst_x2].astype(np.float32))
result[thigh_dst_y1:thigh_dst_y2, thigh_dst_x1:thigh_dst_x2] = blend_t.astype(np.uint8)

# Save outputs
out_path = r'c:\Users\khanz\face-react\frontend\final_clean.jpg'
cv2.imwrite(out_path, result, [cv2.IMWRITE_JPEG_QUALITY, 95])

# Inspection crops
back_crop = result[330:560, 760:1060]
cv2.imwrite(r'c:\Users\khanz\face-react\frontend\check_back.jpg', back_crop)

thigh_crop = result[540:720, 1060:1220]
cv2.imwrite(r'c:\Users\khanz\face-react\frontend\check_thigh.jpg', thigh_crop)

print("Done! Saved final_clean.jpg")
