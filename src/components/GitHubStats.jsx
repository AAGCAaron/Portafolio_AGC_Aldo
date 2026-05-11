import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaCodeBranch, FaStar, FaUsers, FaCode, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import './GitHubStats.css';

const GITHUB_USERNAME = 'AAGCAaron';

const GitHubStats = () => {
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [profileRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
                ]);

                if (!profileRes.ok) throw new Error('API error');

                const profileData = await profileRes.json();
                const reposData = await reposRes.json();

                setProfile(profileData);
                // Sort by stars, take top 3
                const sorted = reposData
                    .filter(r => !r.fork)
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 3);
                setRepos(sorted);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stats = profile ? [
        { icon: <FaCodeBranch />, label: 'Repositorios',   value: profile.public_repos },
        { icon: <FaUsers />,      label: 'Seguidores',     value: profile.followers },
        { icon: <FaCode />,       label: 'Siguiendo',      value: profile.following },
        { icon: <FaStar />,       label: 'Cuenta desde',   value: new Date(profile.created_at).getFullYear() },
    ] : [];

    return (
        <section className="github-section" id="github">
            <Container>
                {/* Header */}
                <div className="text-center mb-5">
                    <p className="github-eyebrow">Actividad en</p>
                    <h2 className="section-title d-flex align-items-center justify-content-center gap-3">
                        <FaGithub /> GitHub
                    </h2>
                    {profile && (
                        <a
                            href={profile.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="github-profile-link mt-3"
                        >
                            @{profile.login} <FaExternalLinkAlt size={11} />
                        </a>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="github-loading">
                        <FaSpinner className="spin" />
                        <span>Cargando datos desde GitHub...</span>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="github-error">
                        <p>⚠️ No se pudo conectar con la API de GitHub. Verifica tu conexión.</p>
                    </div>
                )}

                {/* Content */}
                {!loading && !error && profile && (
                    <>
                        {/* Profile Banner */}
                        <div className="github-profile-banner mb-5">
                            <img src={profile.avatar_url} alt={profile.name} className="github-avatar" />
                            <div className="github-profile-info">
                                <h3 className="github-name">{profile.name || profile.login}</h3>
                                <p className="github-bio">{profile.bio || 'Software Engineer · Open Source enthusiast'}</p>
                                {profile.location && (
                                    <span className="github-location">📍 {profile.location}</span>
                                )}
                            </div>
                        </div>

                        {/* Stats Cards Row */}
                        <div className="github-stats-row mb-5">
                            {stats.map((s, i) => (
                                <div key={i} className="github-stat-card">
                                    <div className="github-stat-icon">{s.icon}</div>
                                    <div className="github-stat-value">{s.value}</div>
                                    <div className="github-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Top Repositories */}
                        {repos.length > 0 && (
                            <>
                                <h3 className="repos-section-title mb-4">Repositorios Destacados</h3>
                                <Row className="g-3">
                                    {repos.map((repo, i) => (
                                        <Col md={4} key={i}>
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="repo-card"
                                            >
                                                <div className="repo-card-header">
                                                    <FaGithub className="repo-icon" />
                                                    <span className="repo-name">{repo.name}</span>
                                                </div>
                                                <p className="repo-desc">
                                                    {repo.description || 'Sin descripción'}
                                                </p>
                                                <div className="repo-footer">
                                                    {repo.language && (
                                                        <span className="repo-lang">
                                                            <span className="lang-dot" />
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    <span className="repo-stars">
                                                        <FaStar size={11} /> {repo.stargazers_count}
                                                    </span>
                                                    <span className="repo-forks">
                                                        <FaCodeBranch size={11} /> {repo.forks_count}
                                                    </span>
                                                </div>
                                            </a>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
};

export default GitHubStats;
