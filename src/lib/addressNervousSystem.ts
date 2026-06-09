export function getNervousSystemNote(lifePath: number, homeNum: number): string {
    const isSensitive   = [11, 22, 33].includes(lifePath);
    const isActivating  = [1, 8].includes(lifePath);
    const isEmotional   = [2, 6].includes(lifePath);
    const isStimulation = [3, 5].includes(lifePath);
    const isStructured  = [4, 7].includes(lifePath);
    const isTransformative = lifePath === 9;
  
    const isCalming    = [4, 7].includes(homeNum);
    const isEnergising = [1, 8].includes(homeNum);
    const isSocial     = [3, 5].includes(homeNum);
    const isNurturing  = [2, 6].includes(homeNum);
    const isIntense    = [9, 11, 22, 33].includes(homeNum);
  
    if (isSensitive) {
      if (isCalming)     return `This home actively supports nervous system recovery. The ${homeNum}-energy creates a natural withdrawal space — quiet, contained, restorative. For a ${lifePath} Life Path with a highly sensitive nervous system, this kind of environment is not a luxury but a necessity.`;
      if (isNurturing)   return `The ${homeNum}-energy wraps this home in softness and emotional safety. For the sensitive ${lifePath} Life Path, this reduces background stress significantly — the body can finally stop bracing.`;
      if (isEnergising)  return `A challenging combination for the nervous system. The ${homeNum}-energy activates and pushes forward — while the ${lifePath} Life Path needs space to decompress. Intentional rest rituals and quiet zones in the home will be essential.`;
      if (isSocial)      return `The ${homeNum}-energy draws people and stimulation into the home. For the ${lifePath} Life Path this can quickly tip into sensory overload. Strong boundaries around alone time will be needed to prevent chronic depletion.`;
      if (isIntense)     return `Both your ${lifePath} Life Path and this home's ${homeNum}-energy operate at a high frequency. Deeply meaningful — but the nervous system rarely gets a true rest here. Grounding practices are not optional in this space.`;
    }
  
    if (isActivating) {
      if (isEnergising)  return `The ${homeNum}-energy amplifies your ${lifePath} Life Path's natural drive. Highly productive — but watch for the home becoming an extension of work mode. The nervous system needs the space to shift gears, not just accelerate.`;
      if (isCalming)     return `A supportive balance. The ${homeNum}-energy gently counteracts the ${lifePath} Life Path's tendency to push without pause. This home creates natural recovery windows — the nervous system benefits from the contrast.`;
      if (isNurturing)   return `The ${homeNum}-energy softens the edges of the ${lifePath} Life Path's intensity. Good for long-term sustainability — this home helps the body remember it is safe to slow down.`;
      if (isSocial)      return `An energising but potentially overstimulating combination. The ${homeNum}-energy keeps the nervous system in high gear alongside the ${lifePath} Life Path's natural ambition. Deliberate downtime will need to be scheduled, not hoped for.`;
      if (isIntense)     return `A powerful but demanding combination. The ${homeNum}-energy matches the ${lifePath} Life Path's ambition — but the nervous system carries a heavy load here. High output is possible; burnout is also a real risk without clear boundaries.`;
    }
  
    if (isEmotional) {
      if (isNurturing)   return `An excellent match for the nervous system. The ${homeNum}-energy mirrors the ${lifePath} Life Path's need for warmth and safety — the body registers this home as a true refuge. Emotional regulation comes more easily here.`;
      if (isCalming)     return `The ${homeNum}-energy provides the structure and stillness the ${lifePath} Life Path's sensitive emotional body needs. A genuinely restorative home — stress responses settle more quickly in this environment.`;
      if (isEnergising)  return `Some friction for the nervous system. The ${homeNum}-energy pushes outward while the ${lifePath} Life Path needs to feel emotionally held. Creating soft, private spaces within the home will help offset the activating energy.`;
      if (isSocial)      return `The ${homeNum}-energy fills this home with movement and social energy. For the ${lifePath} Life Path, this can feel nourishing at first but draining over time. The nervous system needs consistent quiet to reset.`;
      if (isIntense)     return `The ${homeNum}-energy carries a transformative weight that the emotionally sensitive ${lifePath} Life Path will feel strongly. Deep growth is possible here — but so is emotional overwhelm. Self-care structures matter more than usual.`;
    }
  
    if (isStimulation) {
      if (isSocial)      return `The ${homeNum}-energy feeds the ${lifePath} Life Path's love of movement and connection — this home will rarely feel dull. The risk is that the nervous system never fully downregulates. Building in genuine rest, not just a change of stimulation, is key.`;
      if (isCalming)     return `A healthy counterbalance. The ${homeNum}-energy quietly slows the ${lifePath} Life Path's tendency to keep moving. The nervous system benefits from a home that doesn't match its pace — recovery happens more naturally here.`;
      if (isEnergising)  return `High energy throughout — the ${homeNum}-energy and the ${lifePath} Life Path both lean toward action. Productive and exciting, but the body needs more intentional decompression to avoid running on adrenaline long-term.`;
      if (isNurturing)   return `A grounding combination. The ${homeNum}-energy introduces care and routine into the ${lifePath} Life Path's world — the nervous system benefits from this gentle stabilising influence, especially after demanding periods.`;
      if (isIntense)     return `The ${homeNum}-energy adds depth and weight to the ${lifePath} Life Path's already active inner world. Meaningful and rich — but the nervous system can quietly accumulate fatigue here. Regular unplugging is important.`;
    }
  
    if (isStructured) {
      if (isCalming)     return `A deeply compatible match. The ${homeNum}-energy reinforces the ${lifePath} Life Path's need for order and quiet — the nervous system relaxes into this home rather than bracing against it. One of the most restorative combinations.`;
      if (isNurturing)   return `The ${homeNum}-energy introduces warmth into the ${lifePath} Life Path's structured world. Good for long-term wellbeing — the nervous system gets both safety and softness here, which prevents the rigidity that can build in purely structured environments.`;
      if (isSocial)      return `Some tension for the nervous system. The ${homeNum}-energy brings noise and flux that the ${lifePath} Life Path finds draining. Designated quiet spaces and clear personal boundaries will be essential for recovery.`;
      if (isEnergising)  return `The ${homeNum}-energy activates where the ${lifePath} Life Path prefers stillness. Manageable, but the nervous system will need to work harder to find its baseline. Regular solitude and low-stimulation routines will help.`;
      if (isIntense)     return `The ${homeNum}-energy carries a depth the ${lifePath} Life Path can appreciate — but the intensity can disrupt the need for mental quiet. Meditation, nature and structured daily rhythm will anchor the nervous system here.`;
    }
  
    if (isTransformative) {
      if (isCalming)     return `The ${homeNum}-energy offers the ${lifePath} Life Path genuine rest between cycles of growth. The nervous system benefits — this home allows completion and integration rather than constant forward momentum.`;
      if (isNurturing)   return `A supportive environment for the ${lifePath} Life Path's deep emotional processing. The ${homeNum}-energy holds space for the endings and transitions this Life Path frequently navigates.`;
      if (isEnergising)  return `The ${homeNum}-energy keeps the ${lifePath} Life Path in active mode — productive but potentially exhausting for a nervous system that processes at a deep level. Conscious completion rituals will help the body let go.`;
      if (isSocial)      return `The ${homeNum}-energy draws the world in — fitting for the ${lifePath} Life Path's generous nature, but depleting if boundaries are not maintained. The nervous system needs genuine solitude to process and restore.`;
      if (isIntense)     return `A profound but demanding home. Both the ${homeNum}-energy and the ${lifePath} Life Path operate at the level of transformation — meaningful, but the nervous system rarely gets a shallow day here. Grounding and physical care are essential.`;
    }
  
    return `The ${homeNum}-energy of this home interacts with your Life Path ${lifePath} in a way worth paying attention to. Notice how your body feels after spending extended time here — the nervous system will give you the clearest signal.`;
  }