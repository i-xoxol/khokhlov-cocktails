#!/usr/bin/env bash
set -euo pipefail

BASE_PY="/Users/igorx/.nvm/versions/node/v22.22.0/lib/node_modules/openclaw/skills/nano-banana-pro/scripts/generate_image.py"
RES="1K"

prompt_for() {
  local id="$1"
  case "$id" in
    negroni)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered rocks glass with realistic refraction and neon rim glow. Liquid is ruby red with luminous internal bloom; single large clear ice cube. Garnish: orange peel twist with neon edge. Add minimal HUD overlays behind the glass: thin vector reticles, brackets, microtext labels like 'AUTH / HASH / TLS / CRC', and a few circuit-trace arcs that frame the drink (do not obscure). Cinematic neon lighting (cyan + magenta rim lights) with red accent. High-end product illustration, sharp, clean, premium, not cartoon, not clipart, no messy bar scene, no people, no logos, no readable brand text. Composition consistent: centered glass, 1:1 aspect, glass fills ~65% height." ;;
    old_fashioned|rum_cocktail|the_oligarch)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered heavy rocks glass with realistic refraction and neon rim glow. Liquid is deep amber with warm internal glow; single large clear ice cube. Garnish: expressed orange peel with neon edge (minimal). Add subtle HUD overlays behind the glass: thin vector reticles, brackets, microtext fragments 'AUDIT / POLICY / CRC', and circuit-trace arcs (do not obscure). Cyan + magenta rim lighting with amber accent. Premium product illustration, sharp, clean, no cartoon, no people, no logos, no readable text. 1:1 aspect." ;;
    espresso_martini|darnitsa_diesel|the_blackout)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered coupe/martini glass with realistic refraction and neon rim glow. Liquid is dark coffee with violet sheen and thick crema-like foam, internal glow subtle. Garnish: three coffee beans aligned like 'key bits'. Add minimal HUD overlays behind the glass: thin vector reticles, brackets, microtext 'KEYLEN / AES / HASH', and faint circuit traces. Cyan + magenta rim lighting with violet accent. Premium product illustration, sharp, clean, no people, no logos, no readable text. 1:1 aspect." ;;
    aperol_spritz|metro_token|soc_spritz)
      echo "Futuristic neon 'Tron x cybersecurity' spritz cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered wine spritz glass with bubbles, realistic refraction and neon rim glow. Liquid is neon orange-coral with lively bubbles; ice cubes. Garnish: orange slice with neon edge. Subtle HUD overlays behind: timeline graph dots, microtext 'ALERT / EVENT / TRACE', thin circuit arcs. Cyan + magenta rim lighting with coral accent. Premium product illustration, sharp, clean, no people, no logos. 1:1 aspect." ;;
    moscow_mule)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered copper mug or sleek metal cup, neon edge lighting. Liquid is icy ginger-lime glow with condensation, crushed ice. Garnish: lime wheel + mint. Subtle HUD overlays behind: node hops, microtext 'TLS / ROUTE / CRC', circuit arcs. Cyan + magenta rim lighting with icy blue accent. Premium product illustration, sharp, clean. 1:1 aspect." ;;
    margarita)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered margarita or rocks glass with salt rim, realistic refraction and neon rim glow. Liquid is neon lime-green/yellow with internal glow; ice. Garnish: lime wheel with neon edge. Subtle HUD overlays behind: access rings, microtext 'ZERO TRUST / AUTH', thin circuit arcs. Cyan + magenta rim lighting with acid-lime accent. Premium product illustration, sharp, clean. 1:1 aspect." ;;
    blue_minion|rusanivka_blue)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered tall glass with realistic refraction and neon rim glow. Liquid is electric blue with luminous internal bloom; ice cubes. Garnish: lemon twist with neon edge. Subtle HUD overlays behind: packet route arcs, microtext 'TRACE / NODE / CRC', thin circuit traces. Cyan + magenta rim lighting with blue accent. Premium product illustration, sharp, clean. 1:1 aspect." ;;
    white_russian|pozniaky_concrete|kyiv_cake)
      echo "Futuristic neon 'Tron x cybersecurity' dessert cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered rocks or martini glass with realistic refraction and neon rim glow. Liquid is creamy white with soft cyan edge glow, layered look; ice optional. Garnish: minimal (nut dust / subtle twist). Subtle HUD overlays behind: proxy chain nodes, microtext 'SESSION / TOKEN / AUTH', thin circuit arcs. Cyan + magenta rim lighting. Premium product illustration, sharp, clean. 1:1 aspect." ;;
    borscht_market)
      echo "Futuristic neon 'Tron x cybersecurity' savory cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered highball glass with realistic refraction and neon rim glow. Liquid is deep tomato red with subtle internal glow; ice. Garnish: celery stalk + lemon wedge (sleek, stylized). Subtle HUD overlays behind: evidence tag outline, microtext 'CASE / ID / INTAKE', thin circuit arcs. Cyan + magenta rim lighting with red accent. Premium product illustration, sharp, clean. 1:1 aspect." ;;
    *)
      echo "Futuristic neon 'Tron x cybersecurity' cocktail hero image. Dark matte background with subtle perspective grid and soft fog. Centered elegant cocktail glass (appropriate to the drink) with realistic refraction and neon rim glow. Liquid is vibrant neon with internal bloom; crisp ice if applicable; garnish is minimal and recognizable with neon edge. Add subtle HUD overlays behind the glass: thin vector reticles, brackets, microtext fragments 'AUTH / HASH / TLS / CRC', and a few circuit-trace arcs framing the drink (do not obscure). Cinematic cyan + magenta rim lighting. High-end product illustration, sharp, clean, premium, not cartoon, not clipart, no people, no logos, no readable brand text. 1:1 aspect." ;;
  esac
}

mkdir -p images/cocktails

ids=(
  negroni old_fashioned aperol_spritz white_russian espresso_martini sidecar margarita blue_minion manhattan amaretto_sour gt rum_cocktail peach_fizz moscow_mule boulevardier gimlet rusanivka_blue darnitsa_diesel kyiv_cake metro_token left_bank_negroni troieshchyna_ice golden_gate obolon_sailor pechersk_hills the_oligarch pozniaky_concrete borscht_market funicular_lift botanical_garden khreshchatyk_chestnut bessarabka_hustle podil_hipster hydropark_gym dream_town_shopper the_blackout
)

for id in "${ids[@]}"; do
  out="images/cocktails/cocktail_${id}.png"
  echo "==> ${id}"
  uv run "$BASE_PY" --prompt "$(prompt_for "$id")" --filename "$out" --resolution "$RES"
done

echo "All images generated."