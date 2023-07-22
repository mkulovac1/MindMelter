using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mindmelter_backend.Models;

namespace mindmelter_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Participants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
          if (_context.Participants == null)
          {
              return NotFound();
          }
            return await _context.Participants.ToListAsync();
        }

        // GET: api/Participants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(string id)
        {
          if (_context.Participants == null)
          {
              return NotFound();
          }
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }

        // PUT: api/Participants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(string id, Participant participant)
        {
            if (id != participant.ParipantId)
            {
                return BadRequest();
            }

            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Participants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            // provjera je li postoji vec:
            var checkParticipant = _context.Participants.Where(p => p.Name == participant.Name && p.Email == participant.Email).FirstOrDefault();
              
            if(checkParticipant == null)
            {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
                participant = checkParticipant;


            /* if (_context.Participants == null)
            {
                return Problem("Entity set 'QuizDbContext.Participants'  is null.");
            }
          _context.Participants.Add(participant);
          try
          {
              await _context.SaveChangesAsync();
          }
          catch (DbUpdateException)
          {
              if (ParticipantExists(participant.ParipantId))
              {
                  return Conflict();
              }
              else
              {
                  throw;
              }
          }*/


            return Ok(participant);
            // return CreatedAtAction("GetParticipant", new { id = participant.ParipantId }, participant);
        }

        // DELETE: api/Participants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(string id)
        {
            if (_context.Participants == null)
            {
                return NotFound();
            }
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(string id)
        {
            return (_context.Participants?.Any(e => e.ParipantId == id)).GetValueOrDefault();
        }
    }
}
