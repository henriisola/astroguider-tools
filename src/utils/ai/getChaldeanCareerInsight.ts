export function getCareerInsightFromNumber(number: number): string {
    switch (number) {
      case 1:
        return `You are a natural leader. Careers involving entrepreneurship, innovation, or executive decision-making align with your strengths.
  Suggested careers: entrepreneur, CEO, project manager, military officer, executive coach, startup founder.`;
      case 2:
        return `You thrive in cooperative and diplomatic roles. Careers in mediation, counseling, HR, or healing arts suit your sensitivity.
  Suggested careers: therapist, counselor, human resources, diplomat, healer, nurse, mediator.`;
      case 3:
        return `Your creative energy shines in communication-based careers. You excel in writing, design, performance, or media.
  Suggested careers: writer, artist, musician, designer, actor, public speaker, marketer.`;
      case 4:
        return `You are grounded and reliable. Structured careers in engineering, architecture, planning, or management bring success.
  Suggested careers: engineer, architect, administrator, builder, accountant, systems analyst.`;
      case 5:
        return `You are adventurous and versatile. Dynamic careers in travel, marketing, public speaking, or freelance work energize you.
  Suggested careers: travel agent, marketer, public speaker, consultant, journalist, event planner.`;
      case 6:
        return `You are a nurturer. Roles in teaching, caregiving, therapy, or community service allow your compassionate spirit to flow.
  Suggested careers: teacher, caregiver, coach, therapist, nutritionist, non-profit worker.`;
      case 7:
        return `You are a seeker of truth. Careers in research, spirituality, psychology, or academia fit your introspective mind.
  Suggested careers: psychologist, researcher, academic, mystic teacher, spiritual advisor, analyst.`;
      case 8:
        return `You are business-minded and driven. Executive, financial, or organizational leadership roles match your ambition.
  Suggested careers: business executive, investor, banker, administrator, logistics manager, strategist.`;
      case 9:
        return `You are a humanitarian. Roles in global outreach, social work, activism, or artistic impact align with your soul mission.
  Suggested careers: social worker, activist, spiritual teacher, NGO leader, healer, charity director.`;
      case 11:
        return `You are an inspired visionary. Spiritual leadership, public influence, or innovation with purpose are your path.
  Suggested careers: inspirational speaker, spiritual leader, reformer, intuitive coach, author, consciousness guide.`;
      case 22:
        return `You are a master builder. You are meant to lead major projects or movements that bring lasting change to the world.
  Suggested careers: visionary leader, architect, master planner, movement founder, systems designer, reform strategist.`;
      case 33:
        return `You are a spiritual teacher. Your career should uplift others through healing, guidance, or creative transformation.
  Suggested careers: spiritual mentor, transformational coach, teacher, artist-visionary, healer, consciousness educator.`;
      default:
        return "Your career path holds unique qualities that combine multiple energies. Let intuition guide you forward.";
    }
  }
  