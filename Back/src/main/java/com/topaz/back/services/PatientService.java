package com.topaz.back.services;

import com.topaz.back.dtos.PatientDTO;
import com.topaz.back.entities.Patient;
import com.topaz.back.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<PatientDTO> getPatientById(Integer id) {
        return patientRepository.findById(id)
                .map(this::convertToDTO);
    }

    public PatientDTO createPatient(PatientDTO dto) {
        Patient patient = convertToEntity(dto);
        return convertToDTO(patientRepository.save(patient));
    }

    public void deletePatient(Integer id) {
        patientRepository.deleteById(id);
    }

    public PatientDTO updatePatient(Integer id, PatientDTO dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        patient.setNom(dto.getNom());
        patient.setPrenom(dto.getPrenom());
        patient.setDateNaissance(localDateToDate(dto.getDateNaissance()));
        patient.setCin(dto.getCin());
        patient.setSexe(dto.getSexe());
        patient.setAdresse(dto.getAdresse());
        patient.setTypedesoin(dto.getTypedesoin());
        patient.setInp(dto.getInp());

        return convertToDTO(patientRepository.save(patient));
    }

    // Conversion Entity -> DTO
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setNom(patient.getNom());
        dto.setPrenom(patient.getPrenom());
        dto.setCin(patient.getCin());
        dto.setSexe(patient.getSexe());
        dto.setAdresse(patient.getAdresse());
        dto.setTypedesoin(patient.getTypedesoin());
        dto.setInp(patient.getInp());
        dto.setDateNaissance(dateToLocalDate(patient.getDateNaissance()));
        return dto;
    }

    // Conversion DTO -> Entity
    private Patient convertToEntity(PatientDTO dto) {
        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setNom(dto.getNom());
        patient.setPrenom(dto.getPrenom());
        patient.setCin(dto.getCin());
        patient.setSexe(dto.getSexe());
        patient.setAdresse(dto.getAdresse());
        patient.setTypedesoin(dto.getTypedesoin());
        patient.setInp(dto.getInp());
        patient.setDateNaissance(localDateToDate(dto.getDateNaissance()));
        return patient;
    }

    private LocalDate dateToLocalDate(Date date) {
        if (date == null) return null;
        if (date instanceof java.sql.Date) {
            return ((java.sql.Date) date).toLocalDate();
        }
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private Date localDateToDate(LocalDate localDate) {
        if (localDate == null) return null;
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}
