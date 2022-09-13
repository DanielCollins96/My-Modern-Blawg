---
title: What is Stable Diffusion and How to Run It
summary: Blog post explaining what 'Stable Diffusion' is and how to run it. The post also describes some other text-to-image AI models.
date: 2022-09-12
tags:
  - AI
---

## What is Stable Diffusion

Stable Diffusion (SD) is a text-to-image model that can generate or modify images from the text 'prompt' you provide. SD is similar to other text-to-image models such as DALL-E/DALL-E-2 from OpenAI which garnered widespread awe and attention for their ability to generate impressive custom images. Stable Diffusion is open source and that differs from DALL-E, since access to use DALL-E is provided by OpenAI through their own API. Stable Diffusion is also more computationally efficient than DALL-E which was a GAN, since SD is a _latent diffusion_ model. [This video](https://youtu.be/nVhmFski3vg) from Two Minute Papers about Stable Diffusion goes into more depth about the model and it's relation to Dall-E.

Stable Diffusion is similar to Google's recent Imagen model since they both utilize diffusion models in their pipelines, but Imagen is not a latent diffusion model.

Stable Diffusion was trained on images from the [LAION-5B](https://laion.ai/blog/laion-5b/) database. Images. Training images . **Diffusion Models** try to 'de-noise' gaussian noise, step by step. After a labelled image has been distorted through gaussian noise it will look like a pixilated fuzzy picture. Diffusion models reverse the noise in separate steps, after each step the picture will lose noise and look more realistic.

[**Youtube Video Describing Diffusion** ](https://www.youtube.com/watch?v=fbLgFrlTnGU&t=425s&ab_channel=AriSeff)

Compared to previous diffusion models, latent diffusion is able to "reach a near-optimal point between complexity reduction and detail preservation" as the LD paper in the resources mentions. This shows up in SD's ability to run on Mid level personal computers. Stable Diffusion incorporates three components for implementing 'latent diffusion': an autoencoder (VAE), a [U-Net](https://arxiv.org/abs/1505.04597), and a text encoder CLIP [Vit-L/14](https://arxiv.org/abs/2103.00020). Using these components Stable Diffusion receives a text-prompt and then outputs an image of that prompt.

## How to Run Stable Diffusion and Generate Images

To run the Stable Diffusion 'inference pipeline' and try it's text-to-image capabilities you should have a computer with at least 8GB of ram and GPU capabilities. I personally ran out of memory on my 8GB Macbook but I proceeded to use a Google Collab notebook to run the model. The Collab notebook came from huggingface and uses the model weights v1-4, check it out [here](https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/stable_diffusion.ipynb)

## The Code

The following code is available on the previously linked collab notebook and it basically comes down to the following:

the string variable `prompt` provides the inspiration for the content or style of the generated image. The `use_auth_token` parameter requires a huggingface token.

```python
import torch
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", revision="fp16", torch_dtype=torch.float16, use_auth_token=True)

pipe = pipe.to("cuda") # pipe to 'mps' on a Apple Silicon
from torch import autocast

prompt = "calgary flames winning the stanley cup in the dome with moustaches all around"
with autocast("cuda"):
  image = pipe(prompt).images[0]
```

Change the prompt to whatever you want and then run the code, but know that their is a NSFW checker in the library (look for the function check_safety()). My prompt created this:

![My Stable Diffusion Image](/static/images/AI-Flames-Jersey.png)

I remind you that the prompt I provided was somewhat obscure and random. With some prompt engineering and more training steps I would expect to see the Stable Diffusion generate a higher quality image.

You can also specify some training parameters to the model, like:

- `num_inference_steps` that takes an integer for amount of steps, generally more steps means a higher quality image (default 50).
- `guidance_scale` that is an integer that determines how diverse the types of generated images will be, I read 7-8.5 usually works well.

```python
with autocast("cuda"):
  image = pipe(prompt, num_inference_steps=80, generator=generator, guidance_scale=7).images[0]
```

## Thoughts

The 'skills' of this model may seem threatening for artistic creatives but I see it as empowering more than anything, this is a tool for creatives. The business world is forever preaching about a future with AI helpers that 'assist' people... Well Standard Diffusion is as compelling as any AI software 'tool' I've ever used. Using this model alongside thoughtful prompts and image inputs enables fast prototyping of high quality image outputs. The iterative workflow shown [here](https://www.reddit.com/r/StableDiffusion/comments/xcjj7u/sd_img2img_after_effects_i_generated_2_images_and/) of an artist with After Effects and SD looks incredible. The back and forth nature of some visual edits being done by a person and then prompting a text-to-image model to further develop an image seems empowering and even natural.

The state of the art text-to-image models have shown incredible ability to use words, images and different custom vectors as inputs for producing images, and I suspect this ability will be one of the most important tools in any AI assistants toolbox in the not too distant future. Text-to-image models look like some of the best AI models for having an embedded fun-factor and application value thats obvious even in simple examples.

What also excites me about Stable Diffusion is it's lower computational constraints for running text-to-image locally (Not to mention the license constraints SD lacks).

## Resources

- [Stable Diffusion Git Repo](https://github.com/CompVis/stable-diffusion)
- [HuggingFace Stable Diffusion Repo](https://huggingface.co/CompVis/stable-diffusion)
- [HuggingFace SD v1-4 Training Checkpoint Repo](https://huggingface.co/CompVis/stable-diffusion-v1-4)
- [Imagen Research Paper](https://arxiv.org/abs/2205.11487)
- [Latent Diffusion Research Paper](https://arxiv.org/abs/2112.10752)
