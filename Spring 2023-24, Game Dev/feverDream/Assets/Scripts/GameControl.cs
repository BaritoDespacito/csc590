using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.SocialPlatforms.Impl;
using Random = UnityEngine.Random;

public class GameControl : MonoBehaviour
{
    private GameObject player;
    [SerializeField] private int score;
    [SerializeField] private int nextLevelScore = 500;
    [SerializeField] private int level = 1;
    [SerializeField] private TextMeshProUGUI _levelText;
    [SerializeField] TextMeshProUGUI _nextLevelScoreText;
    
    [SerializeField] private GameObject _skullEnemyPrefab;
    [SerializeField] private GameObject _crawlerEnemyPrefab;
    public int numClusters = 5;
    public int numEnemies = 10;
    public double distFromPlayer = 25;
    private ArrayList clusters = new ArrayList();
    
    [SerializeField] private bool generateEnemies = true;
    
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindWithTag("Player");
        
        GenerateEnemies();
    }

    // Update is called once per frame
    void Update()
    {
        if (player.TryGetComponent<PlayerMove>(out var playerMove))
        {
            score = playerMove.score;
        }
        if (score >= nextLevelScore)
        {
            nextLevelScore = (int) (nextLevelScore * 1.5);
            _nextLevelScoreText.text = "Next Level: " + nextLevelScore;
            level++;
            _levelText.text = "Level: " + level;
            numClusters += 5;
            numEnemies += 5;
            distFromPlayer -= 1;
            GenerateEnemies();
        }
    }

    void GenerateEnemies()
    {
        if (!generateEnemies) return;
        
        for (var i = 0; i < numClusters; i++)
        {
            clusters.Add(new EnemyGeneration.Cluster(numEnemies, 90, 90, distFromPlayer, player.transform.position));
        }
        
        foreach (EnemyGeneration.Cluster cluster in clusters)
        {
            foreach (Vector3 enemy in cluster.GetEnemies())
            {
                if (Random.value > 0.5*(Math.Log(level)/2))
                {
                    Instantiate(_skullEnemyPrefab, enemy, Quaternion.identity);
                }
                else
                {
                    Instantiate(_crawlerEnemyPrefab, enemy, Quaternion.identity);
                }
            }
        }
    }
}
