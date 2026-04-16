-- Migration: add_allergies_to_pets
-- Ticket: TICKET-027
-- Description: Add allergies text column to pets table for "Alergias Conhecidas" alert card.

ALTER TABLE public.pets ADD COLUMN IF NOT EXISTS allergies text;
