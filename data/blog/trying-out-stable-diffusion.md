---
title: Checking Out Stable Diffusion
summary: Blog post explaining what generative AI models like 'Stable Diffusion' are and also showing how to run it.
date: 2022-09-12
tags:
  - AI
---

# Stable Diffusion

## What is it

Stable Diffusion is a text-to-image model that generates images from a text 'prompt' you provide. Recently another text-to-image model called DALL-E from OpenAI garnered widespread awe and attention for its ability to generate impressive custom images.

Stable Diffusion differs from DALL-E in that it is open source, while DALL-E is only available through an API for a price. Stable Diffusion is also a different ML architecture than DALL-E since DALL-E was trained using GPT-3 (transformers), while Stable Diffusion is a diffusion model, the same as Google's recent text-to-image model Imagen.

**Diffusion Models** try to 'de-noise' gaussian noise, step by step. After a labelled image has been distorted through gaussian noise it will look like a pixelated fuzzy picture. Diffusion models reverse the noise in separate steps, after each step the picture will lose noise and look more realistic.

**Video about Diffusion** - https://www.youtube.com/watch?v=fbLgFrlTnGU&t=425s&ab_channel=AriSeff

Stable Diffusion incorporates three components for implementing 'latent diffusion' which is a faster and efficient form of diffusion. Latent diffusion utilizes three components, an autoencoder (VAE), a U-Net, and a text encoder CLIP. Using these components Stable Diffusion receives a text-prompt and then outputs an image of that prompt.

## How to Run

To run the Stable Diffusion 'inference pipeline' and try it's text-to-image capabilities you should have a computer with at least 8GB of ram and GPU capabilities. I personally needed to use Google's Collab to run the model and my computer ran out of memory. Hugging face provides a collab notebook that lets you run it through a browser on Googles computer.

https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/stable_diffusion.ipynb

## The Code

The following code is available on the previously linked collab notebook and it basically comes down to the following:

```python
import torch
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", revision="fp16", torch_dtype=torch.float16, use_auth_token=True)

pipe = pipe.to("cuda") # pipe to 'mps' on a Mac
from torch import autocast

prompt = "calgary flames winning the stanley cup in the dome with moustaches all around"
with autocast("cuda"):
  image = pipe(prompt).images[0]
```

Change the prompt to whatever you want, but know that their is a NSFW checker in the library (look for the function check_safety()). My prompt created this:

![My Stable Diffusion Image](/static/images/AI-Flames-Jersey.png)

## Resources

- https://github.com/CompVis/stable-diffusion
- https://huggingface.co/CompVis/stable-diffusion-v1-4
